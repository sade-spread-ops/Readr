/* eslint-disable no-unused-vars */
// Express router for all main features of the Readr app
/* eslint-disable */

const router = require('express').Router();
const { Users } = require('react-feather');
const {
  categorySearch,
  selectCategory,
  selectBook,
  getInfo,
} = require('./suggestion');
const dbHelpers = require('../sequelize/db-helpers');
const {
  User, UserFollower, UserHaveRead, UserBookClubs, Bookclubs, UserReview
} = require('../sequelize/index');
const { grabBooksByGenre, createBook } = require('./genre');

const { searchByBooks, getBookCover } = require('./search');

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect('/');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.send(`you are logged in as: ${req.user.username}`);
});

router.get('/suggestion', (req, res) => {
  const { user } = req;
  const book = {};
  dbHelpers.getPreferences(user.id)
    .then((preferences) => {
      const category = selectCategory(preferences.dataValues);
      book.genre = category;
      return categorySearch(category, 0);
    })
    .then((books) => categorySearch(book.genre, selectBook(books.ebook_count)))
    // Get total book count & Send request with offset set to a random number from the count
    .then((books) => {
      book.title = books.works[0].title;
      book.author = books.works[0].authors[0].name;
      book.urlSnippet = books.works[0].ia;
      // book.availability = books.works[0].availability.status;
      book.buyLink = books.works[0].saleInfo;
      return getInfo(book.title, book.author);
    })
    .then((bookInfo) => {
      // console.log(bookInfo);
      book.isbn = bookInfo.isbn;
      book.description = bookInfo.description;
      book.coverURL = bookInfo.coverURL;
      book.title = bookInfo.title;
      book.buyLink = bookInfo.buyLink;
      return dbHelpers.insertBook(book);
      // res.send(JSON.stringify(book));
    })
    .then(() => res.send(JSON.stringify(book)))
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

// Endpoint to return list of followers
router.get('/followers', (req, res) => {
  const { user } = req;
  dbHelpers.getFollowers(user.id)
    .then((followers) => {
      res.send(JSON.stringify(followers));
    });
});

// Endpoint to return list of users you are following and their id#
router.get('/following', (req, res) => {
  const { user } = req;
  dbHelpers.getFollowing(user.id)
    .then((following) => {
      res.send(JSON.stringify(following));
    });
});

router.get('/profile', (req, res) => {
  res.send('successfully connected to /profile');
});

// Endpoint to follow a user
router.post('/follow/:followerID', (req, res) => {
  const { user } = req;
  dbHelpers.followUser(user.id, req.params.followerID)
    .then(() => {
      res.send('successfully followed');
    });
});

// Endpoint to unfollow a user
router.post('/unfollow/:followerID', (req, res) => {
  const { user } = req;
  dbHelpers.unfollowUser(user.id, req.params.followerID)
    .then(() => {
      res.send('successfully unfollowed');
    });
});

// Endpoint to update user preferences
router.post('/preferences', async (req, res) => {
  // change quizzed to true
  const { chosenName } = req.body;
  const { googleId } = req.body.user;

  await User.update(
    { isQuizzed: true, chosenName },
    { where: { googleId } },
  );

  const userID = req.body.user.id;
  const genres = Object.keys(req.body).slice(0, Object.keys(req.body).length - 1);

  // const { userID, genre, toRead } = req.body;

  genres.forEach((genre) => {
    const toRead = req.body[genre];

    dbHelpers.updatePreferences(userID, genre, toRead)
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  });
  res.sendStatus(201);
});

// sends have read data to server
router.post('/haveread', (req, res) => {
  const {
    userID,
    isbn,
    coverURL,
    title,
    author,
    description,
    haveRead,
  } = req.body;
  dbHelpers.createUserRead(userID, isbn, coverURL, title, author, description, haveRead);
});

router.get('/haveread', async (req, res) => {
  const { userID } = req.query;
  await UserHaveRead.findAll({
    where: {
      userID,
    },
  })
    .then((data) => {
      res.send(data);
      console.log(data.userID, 'USER ID');
      console.log(data, 'BOOK DATA');
    });
});

router.post('/interest', (req, res) => {
  // console.log(req.body);
  const { userID, isbn, toRead } = req.body;
  dbHelpers.createUserBook(userID, isbn, toRead)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => console.error('POST ERROR'));
});

router.patch('/interest', (req, res) => {
  const { userID, isbn, toUpdate } = req.body;
  dbHelpers.changeUserInterest(userID, isbn, toUpdate)
    .then(() => dbHelpers.findBook(isbn))
    .then((bookData) => dbHelpers.updatePreferences(userID, bookData.genre, toUpdate))
    .then(() => {
      res.status(200).send('book list updated');
    })
    .catch((error) => console.error(error));
});

router.post('/booklist', (req, res) => {
  const { userID, toRead } = req.body;
  // console.log(userID);
  dbHelpers.userBookList(userID, toRead)
    .then((bookList) => {
      // console.log(bookList, 'bookpost');
      res.send(bookList);
    })
    .catch((error) => console.error(error));
});

// reset user genre preferences
router.patch('/reset', (req, res) => {
  const { id, googleId } = req.body;
  // reset isquizzed in db
  User.update(
    { isQuizzed: false },
    { where: { googleId } },
  );

  dbHelpers.createPreferences(id)
    .then(() => {
      res.sendStatus(204);
    });
});

// check if user has taken preference quiz
router.post('/quizzed', (req, res) => {
  // check if user has been quizzed
  const { googleId } = req.body.user;
  User.findOne({
    where: {
      googleId,
    },
  })
    .then((user) => {
      const { isQuizzed } = user;
      res.send(isQuizzed);
    })
    .catch((err) => {
      console.error(err);
      res.send(false);
    });
});

// save a new users chosen username
router.post('/saveName', async (req, res) => {
  const { chosenName } = req.body;
  const { googleId } = req.body.user;
  // see if name has been taken
  await User.findOne({
    where: { chosenName },
  })
    .then(async (response) => {
      // if name doesnt exist, update current user
      if (!response) {
        await User.update({ chosenName }, {
          where: {
            googleId,
          },
        });
        // return updated user
        await User.findOne({
          where: {
            googleId,
          },
        }).then((user) => res.send(user));
      } else {
        throw response;
      }
    })
    // if name has been taken, make user pic new name
    .catch((error) => {
      console.error(error);
      res.status(400).send('failure');
    });
});

router.post('/addFriend', async (req, res) => {
  const { friend } = req.body;
  const { chosenName, id } = req.body.user;
  // get user ID of friend
  const friendId = await User.findOne({
    where: {
      chosenName: friend,
    },
  })
    .then((foundFriend) => {
      if (foundFriend) {
        console.log(foundFriend, 'foundFriend');
        return foundFriend.dataValues.id;
      }
      throw foundFriend;
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('username not found');
    });
  // add your userID to that persons following list
  await UserFollower.findOne({
    where: {
      userID: friendId,
      followerID: id,
    },
  })
    .then(async (response) => {
      // if not already following, follow
      if (!response) {
        await UserFollower.create({
          userID: friendId,
          followerID: id,
        });
      } else {
        throw response;
      }
    })
    .catch(() => {
      console.error(error);
      res.status(400).send('Already following');
    });
});

router.get('/getFriends', async (req, res) => {
  const { id } = req.user.dataValues;
  // get list of IDs for those you're following
  const friends = await UserFollower.findAll({
    where: {
      followerID: id,
    },
  })
    .then((friendsList) => friendsList.map((friend) => friend.dataValues.userID));
  // get list of names for those you're following
  const getFriends = async () => Promise.all(friends.map((friendId) => User.findOne({
    where: {
      id: friendId,
    },
  })
    .then((foundFriend) => ({
      name: foundFriend.dataValues.chosenName,
      email: foundFriend.dataValues.email,
    }))));
  const response = await getFriends().then((data) => data);
  res.send(response);
});

router.get('/getBookclubs', async (req, res) => {
  // get bookclub IDs
  const { user } = req.query;
  // eslint-disable-next-line dot-notation
  // console.log(JSON.parse(user), 'PARSED');
  // console.log(user['id'], 'SUER');
  // console.log(id, 'ID');
  const test2 = await UserBookClubs.findAll({
    where: {
      userID: JSON.parse(user).id,
    },
  }).then((foundClubs) => foundClubs.map((club) => club.bookclubID));
  const bookclubs = async () => Promise.all(test2.map((bookclubid) => Bookclubs.findOne({
    where: {
      id: bookclubid,
    },
  })));
  const response = await bookclubs();
  const friendsNames = async () => Promise.all(response.map(async (club) => {
    const wut = await UserBookClubs.findAll({
      where: {
        bookclubID: club.id,
      },
    });
    const innerFriendsNames = async () => Promise.all(wut.map((ubc) => User.findOne({
      where: {
        id: ubc.userID,
      },
    })
      .then((user) => user.dataValues.chosenName)));
    const finalName = await innerFriendsNames();
    return { book: club.bookName, friends: finalName, hangoutLink: club.ghLink };
  }));
  const response2 = await friendsNames();
  res.send(response2);
});

router.get('/getFollowers', async (req, res) => {
  console.log('followers');
  const { id } = req.user.dataValues;
  // get list of IDs for those you're following
  const friends = await UserFollower.findAll({
    where: {
      userID: id,
    },
  })
    .then((followList) => followList.map((friend) => friend.dataValues.followerID));
  // get list of names for those you're following
  const getFriends = async () => Promise.all(friends.map((friendId) => User.findOne({
    where: {
      id: friendId,
    },
  })
    .then((foundFriend) => ({
      name: foundFriend.dataValues.chosenName,
      email: foundFriend.dataValues.email,
    }))));
  const response = await getFriends().then((data) => data);
  res.send(response);
});

router.post('/clubInvite', async (req, res) => {
  const {
    hangoutLink, friendsList, chosenName, title,
  } = req.body.params;
  console.log('club invite sent');
  // create bookclub and add link, return bookclubID
  const bcID = await Bookclubs.create({
    bookName: title,
    ghLink: hangoutLink,
  })
    .then((data) => data.dataValues.id)
    .catch((error) => console.log(error, 'error'));
  // get userIDs for chosenName and friendsList
  const namesList = [...friendsList, chosenName];
  const getNames = async () => Promise.all(namesList.map((name) => User.findOne({
    where: {
      chosenName: name,
    },
  })
    .then((foundName) => foundName.id)));
  const idList = await getNames().then((data) => data);
  // for each userID, add them to UserBookClubs
  const joinUserBookclub = async () => Promise.all(idList.map((id) => UserBookClubs.create({
    userID: id,
    bookclubID: bcID,
  })));
  await joinUserBookclub();
});


router.get('/genre/romance', ( req, res) => {
   grabBooksByGenre("romance")
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      console.log(error);
      res.status(500).end();
    });
  });

  router.get('/genre/comic', ( req, res) => {
    grabBooksByGenre("comic")
      .then((data) => {
        res.send(data);
      }).catch((error) => {
        console.log(error);
        res.status(500).end();
      });
    });

  router.get('/genre/satire', ( req, res) => {
  grabBooksByGenre("satire")
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      console.log(error);
      res.status(500).end();
    });
  });


  router.get('/genre/mystery', ( req, res) => {
    grabBooksByGenre("mystery")
      .then((data) => {
        res.send(data);
      }).catch((error) => {
        console.log(error);
        res.status(500).end();
      });
    });


router.get('/genre/western', ( req, res) => {
  grabBooksByGenre("western")
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      console.log(error);
      res.status(500).end();
    });
  });

router.get('/genre/drama', ( req, res) => {
  grabBooksByGenre("drama")
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      console.log(error);
      res.status(500).end();
    });
  });

  router.get('/genre/crime', ( req, res) => {
  grabBooksByGenre("crime")
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      console.log(error);
      res.status(500).end();
    });
  });

  router.get('/genre/horror', ( req, res) => {
  grabBooksByGenre("horror")
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      console.log(error);
      res.status(500).end();
    });
  });

router.patch('/theme', (req, res) => {
  let { theme, user_id } = req.body;
  User.update(
    { theme: theme },
    { where: { id: user_id }},
  )
  .then(() => {
    res.sendStatus(204);
  })
})

router.get('/books', (req, res) => {
  // console.log(req.query.title, 'REQ');
  searchByBooks(req.query.title)
    .then(({ data }) => {
      // console.log(data, 'DATA');
      res.send((data.docs));
    }).catch((error) => {
      console.log('Get books fail');
      res.status(500).end();
    });
});

router.post('/insertIntoBookDb', (req, res) => {
  const book = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    coverURL: req.body.coverURL,
    buyLink: req.body.buyLink,
    genre: req.body.genre,
    urlSnippet: req.body.urlSnippet,
    availability: req.body.availability,
  };
  return dbHelpers.insertBook(book);
});

router.post('/reviews', (req, res) => {
  UserReview.findOrCreate({
    where: {
      userID: req.body.userID,
      title: req.body.title,
    }
  })
    .then((results) => {
      UserReview.upsert({
        id: results[0].dataValues.id,
        userID: req.body.userID,
        title: req.body.title,
        author: req.body.author,
        review: req.body.review
      });
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
    })
});

router.get('/reviews', (req, res) => {
  UserReview.findAll({
    where: {
      title: req.query.title,
      author: req.query.author
    }
  })
    .then((results) => {
      res.status(200);
      res.send(results);
    })
   .catch((error) => {
      console.log(error);
    });
});

router.get('/users', (req, res) => {
  User.findOne({
    where: {
      id: req.query.userID
    }
  })
    .then((result) => {
      console.log(result);
      res.status(200);
      res.send(result);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})


module.exports = router;
