express = require("express");

const Posts = require("./db");

const router = express.Router();
router.use(express.json());

// GET ROUTES
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json({
        success: true,
        posts
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The posts information could not be retrieved"
      });
    });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;

  Posts.findById(userId)
    .then(post => {
      // console.log(post[0].id);

      if (post.length === 0) {
        return res.status(404).json({
          error: "The user with the specified ID does not exist"
        });
      } else {
        res.status(200).json({ post });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The post information could not be retrieved."
      });
    });
});

// POST

router.post("/", (req, res) => {
  console.log(req);
  const { title, contents } = req.body;
  const newPost = req.body;
  if (!title || !contents) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide title and content for the post." });
  }

  Posts.insert(newPost)
    .then(post => {
      res.status(201).json({ success: true, post });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the post to the database"
      });
    });
});

// PUT

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (!changes.title || !changes.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post"
    });
  }

  Posts.update(id, changes)
    .then(updatedPost => {
      console.log(updatedPost);
      if (!updatedPost) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist"
        });
      } else {
        res.status(201).json({
          success: true,
          changes
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "THe post information could not be modified"
      });
    });
});

// DELETE

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Posts.remove(id)
    .then(post => {
      if (!post) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist"
        });
      } else {
        res.status(204).end();
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The post could not be removed"
      });
    });
});

module.exports = router;