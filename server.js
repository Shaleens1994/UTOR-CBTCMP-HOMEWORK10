const express = require('express'),
      app = express();
      PORT = process.env.PORT || 3000;
      api = require("./routes/route1");
      html = require("./routes/route2");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
api(app);
html(app);
app.listen(PORT, () => {
    console.log('app is running at http://localhost:' + PORT);
});