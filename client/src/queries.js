import {
    gql
  } from "@apollo/client";
const categoryQuery=(categ)=>{
    //this function returns gql query for the category that we pass as an argument
    const query = gql`query category{ 
        category(input:{title:"${categ}"}){
        products{
          id
          category
          name
          inStock
          gallery
          description
          attributes{
            name
              type
              items{
                value
              }
          }
          brand
          prices{
            currency
            amount
          }
          }
        }
      }`
      return query;
}
const productQuery=(productId)=>{
  //this function returns gql query for the product that we pass as an argument
  const query = gql`query product{
    product(id:"${productId}"){
      id
      category
      name
      inStock
      gallery
      description
      attributes{
        name
          type
          items{
            value
          }
      }
      brand
      prices{
        currency
        amount
      }
    }
  }`
    return query;
}

const CATEGORIES = gql` 
  query categories{
    categories{
      name
    }
  }`
  const CURRENCIES = gql`
  query currencies{
      currencies
  }`
export {categoryQuery, CATEGORIES, CURRENCIES, productQuery};