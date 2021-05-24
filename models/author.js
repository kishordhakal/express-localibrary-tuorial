const { DateTime } = require("luxon");
const { Settings } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  
  if(this.date_of_death && this.date_of_birth){
    //return (DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)) + " - " + (DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)); 
    return DateTime.fromJSDate(this.date_of_death).year - DateTime.fromJSDate(this.date_of_birth).year; 
	
  }else if (this.date_of_death){
    return "Death only: " + DateTime.fromJSDate(this.date_of_death).toLocaleString(); 
  }else if (this.date_of_birth){
    return "Birth only: "+ DateTime.fromJSDate(this.date_of_birth).toLocaleString(); 
  }else{
    return "No Lifespan Data";
  }
});

/*
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});
*/

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);