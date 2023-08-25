const FavoriteModel = require('../models/Favorite');
const User_model=require('../models/user');


async function saveFavorite(favorite){
    try{ 
         let newFav =FavoriteModel.create(favorite);
         let userId = favorite.userId;
         let user=await User_model.findById(userId);
         if(user){
            user.favorite.push((await newFav)._id);
             await user.save();
           
         }else{
             console.log('product not found');
         }
         return newFav;
    }catch(err){
     console.log(err);
    }
} 
function getFavoriteByUserId(userId){
    return FavoriteModel.findOne({userId:userId}).populate('userId')
}
       
 function getAllFavorites(){
     return FavoriteModel.find().populate("userId");
    
 }

//  function updateFavorite(id,FavData){
//      return FavoriteModel.findByIdAndUpdate(id,FavData,{new:true})
//  }
//  async function deleteFavorite(id){
//      try{
//         return  FavoriteModel.findByIdAndDelete(id);
//      }catch(err){
//          console.log(err);
//      }

     async function  addNewProductsInFav (userId ,products){
        var oldFav=await getFavoriteByUserId(userId)
        var newFavitems=[...oldFav.productId,...products]
        return FavoriteModel.findOneAndUpdate({userId:userId},{productId:newFavitems},{new:true}).populate('userId')
    }
    
    async function removeProductsInFav(userId,productId ){
        var oldFav=await getFavoriteByUserId(userId)
        console.log(oldFav);
        for (let i = 0; i < oldFav.productId.length; i++) {
            if (oldFav.productId[i] == productId) {
                oldFav.productId.splice(i, 1);
            }
        }
        console.log(oldFav);
        var newFavitems =[...oldFav.productId]

        return FavoriteModel.findOneAndUpdate({userId:userId},{productId:newFavitems},{new:true}).populate('userId')
    }

 
 module.exports= {
    saveFavorite,
    getAllFavorites,
    addNewProductsInFav,
    getFavoriteByUserId,
    removeProductsInFav
   
  } 

























// // Create a new favorite
// app.post('/favorites', (req, res) => {
//     const favorite = req.body;
//     favorites.push(favorite);
//     res.status(201).json({ message: 'Favorite created', favorite });
//   });
  
//   // Read all favorites
//   app.get('/favorites', (req, res) => {
//     res.json(favorites);
//   });
  
//   // Read a specific favorite by ID
//   app.get('/favorites/:id', (req, res) => {
//     const favoriteId = req.params.id;
//     const favorite = favorites.find((favorite) => favorite.id === favoriteId);
//     if (!favorite) {
//       res.status(404).json({ message: 'Favorite not found' });
//     } else {
//       res.json(favorite);
//     }
//   });
  
//   // Update a favorite by ID
//   app.put('/favorites/:id', (req, res) => {
//     const favoriteId = req.params.id;
//     const updatedFavorite = req.body;
//     const favoriteIndex = favorites.findIndex(
//       (favorite) => favorite.id === favoriteId
//     );
//     if (favoriteIndex === -1) {
//       res.status(404).json({ message: 'Favorite not found' });
//     } else {
//       favorites[favoriteIndex] = updatedFavorite;
//       res.json({ message: 'Favorite updated', favorite: updatedFavorite });
//     }
//   });
  
//   // Delete a favorite by ID
//   app.delete('/favorites/:id', (req, res) => {
//     const favoriteId = req.params.id;
//     const favoriteIndex = favorites.findIndex(
//       (favorite) => favorite.id === favoriteId
//     );
//     if (favoriteIndex === -1) {
//       res.status(404).json({ message: 'Favorite not found' });
//     } else {
//       const deletedFavorite = favorites.splice(favoriteIndex, 1);
//       res.json({ message: 'Favorite deleted', favorite: deletedFavorite[0] });
//     }
//   });