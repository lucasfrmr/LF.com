const express = require('express');
const router = express.Router();

router.get('/skch_1', (req, res) => {
  if (err){
    console.log(err);
  } else {
    res.render('skch_1', {
      title: "skch_1"
    });
  });
});
  
module.exports = router;