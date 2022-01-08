const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: 'Action' },  
  { id: 2, name: 'Horror' },  
  { id: 3, name: 'Romance' },  
];

app.get('/api/genres',( req , res )=>{
	res.send(genres);
});


app.post('/api/genre',( req, res )=> {
	
	const {error} = validateGenres(req.body);
	
	//console.log(error);

	if (error) return res.status(400).send(error.details[0].message);
	genres.push(req.body);
	res.send(genres);
});

app.put('/api/genre/:id',( req , res )=> {
	let id = req.params.id;
	
	let genre = genres.find( c =>  c.id == id );
	
	if(!genre) res.status(404).send('NOT PRESENT');
	
	genre.name = req.body.name;
	
	res.status(200).send(genres);
});

function validateGenres(genre){
	
	const schema = Joi.object({
		id: Joi.number().required(),
		name: Joi.string().min(3).required()
	});
	
	return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));