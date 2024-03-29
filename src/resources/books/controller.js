const db = require("./../../utils/database");
const BookModel = require("./model");


/*
CURL EXAMPLE

curl -X POST -H "Content-Type: application/json" -d '{"title":"You Live Only Once","type":"Fiction","author":"Carlo Minciacchi","topic":"romance","publicationDate":"2002-07-18T22:00:00.000Z"}' http://localhost:3030/books

// returns error: publicationDate is not named correctly (publication)
curl -X POST -H "Content-Type: application/json" -d '{"title":"You Live Only Once","type":"Fiction","author":"Carlo Minciacchi","topic":"romance","publication":"2002-07-18T22:00:00.000Z"}' http://localhost:3030/books
*/
async function createOne(req, res) {
  const bookToCreate = {
    ...req.body,
  }

  if(bookToCreate.title === undefined) {
    return res.status(500).send({error: "Book title was not provided"});
  }
  if(bookToCreate.type === undefined) {
    return res.status(500).send({error: "Book type was not provided"});
  }
  if(bookToCreate.author === undefined) {
    return res.status(500).send({error: "Book author was not provided"});
  }
  if(bookToCreate.topic === undefined) {
    return res.status(500).send({error: "Book topic was not provided"});
  }
  if(bookToCreate.publicationDate === undefined) {
    return res.status(500).send({error: "Book publicationDate was not provided"});
  }
  else {
    try {
      const convertedDate = new Date(bookToCreate.publicationDate)
      if(isNaN(convertedDate)) throw Error("Invalid date")
    }
    catch(err) {
      return res.status(500).send({error: "Book publicationDate is not a valid date:" + bookToCreate.publicationDate});
    }
  }

  console.log("Attempting to create book:", bookToCreate)

  const result = await BookModel.createBook(bookToCreate)
  
  console.log("Book creation response:", result)
  
  if(result.error !== undefined) {
    res.status(500).send(result)
  }
  else {
    res.json({data: result})
  }
}

async function getAll(req, res) {
  console.log("Attempting to get all books")
  const result = await BookModel.getAllBooks()
  console.log("Fetching books response:", result)
  if(result.error !== undefined) {
    res.status(500).send(result)
  }
  else {
    res.json({data: result})
  }
}

module.exports = {createOne, getAll}