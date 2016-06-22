const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.route('/')
	.get(function(req, res)
	{
		knex('teas').then(teas=>
		{
			res.send(teas);
		}).catch(err=>{
			res.send(err);
		})
	})
	.post(function(req, res)
	{});

router.route('/new')
	.get(function(req,res)
	{});

router.route('/:id/edit')
	.get(function(req, res)
	{});

router.route('/:name')
	.get(function(req, res)
	{})
	.put(function(req, res)
	{
		knex('teas')
			.where('name',req.params.name)
			.update(req.body)
			.returning('quantity')
			.then(function(data){
				res.send(data)
			}).catch(function(err){
				res.send(err);
		})
	})
	.delete(function(req,res)
	{});

module.exports = router;
