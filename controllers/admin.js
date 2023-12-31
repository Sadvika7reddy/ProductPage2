const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit
  // if(!editMode){
  //   return res.redirect('/')
  // }
  const prodId=req.params.productId;
  Product.findId(prodId,product=>{
    if(!prodId){
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:true,
      product:product
    });
  })
  
};

exports.postEditPriduct=(req,res,next)=>{
   const prodId=req.body.productId;
   const updateTitle=req.body.title;
   const updatePrice=req.body.price;
   const updatedImageurl=req.body.imageUrl;
   const updatedDescription=req.body.description;
   const updatedProduct=new Product(prodId,updateTitle,updatedImageurl,updatedDescription,updatePrice)
   updatedProduct.save();
   res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.deleteProducts=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.deletProductById(prodId)
  res.redirect('/admin/products')
}
