const apikey = '&apikey=7512d6f2' 
const request = require('request');
 


var Movie = function () {
    this.data = {}
    
};

Movie.prototype.search = (query, callback) => {
    console.log(`Je cherche ${query}`)
    name = query.replace(' ', '+')

    request(`http://www.omdbapi.com/?t=${name}${apikey}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.Title);
        // console.log(body.Year);
        // console.log(body.Rated);
        // console.log(body.Released);
        // console.log(body.Runtime);
        // console.log(body.Genre);
        
        var Title = body.Title
        var Year = body.Year
        var Rated = body.Rated
        var Released = body.Released
        var Runtime = body.Runtime
        var Genre = body.Genre
        

        this.data = {Title,Year,Rated,Released,Runtime,Genre}
        callback()
        return this.data
        //  callback = infos

        // export {Title,Year,Rated,Released,Runtime,Genre}
        // console.log(body.explanation);
      });
};


module.exports = Movie;