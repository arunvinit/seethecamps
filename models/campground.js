const mongoose=require('mongoose');
const { campgroundSchema } = require('../schema');
const Schema=mongoose.Schema;
const Review = require('./review')


const ImageSchema=new Schema({
    url:String,
    filename:String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_300');
})

const CampgroundSchema=new Schema({
    title:String,
    images:[
        {
            url:String,
            filename:String
        }
    ],
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    price:Number,
    description:String,
    location: String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc){
    console.log(doc)
})

module.exports=mongoose.model('Campground',CampgroundSchema);