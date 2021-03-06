'use strict'

var assert = require('assert');

suite('submitAnswers', function() {

  // ensure that -
  // (1) the "Answers" collection exists
  // (2) we can connect to the collection
  // (3) the collection is empty
  test('server initialization', function(done, server) {
    server.eval(function() {
      var collection = Answers.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 0);
      done();
    });
  });

  // ensure that -
  // (1) we can add data to the collection
  // (2) after data is added, we can retrieve it
  test('server insert : OK', function(done, server, client) {
    server.eval(function() {
      Answers.insert({answerText: "whee!"  });
      var collection = Answers.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 1);
      done();
    });

    client.once('collection', function(collection) {
      assert.equal(Answers.find().fetch().length, 1);
      done();
    });
  });

});
suite('addVotes', function() {

  // ensure that -
  // (1) we can add data to the collection
  // (2) after data is added, we can retrieve it
  test('server insert votes : OK', function(done, server, client) {
    server.eval(function() {
      Answers.insert({answerText: "wheeeeeeeeeee!"});
      Answers.update({answerText: "wheeeeeeeeeee!"},{$inc : {'yes':1}});
      var voteCollection = Answers.find().fetch();
      emit('collection', voteCollection);
    }).once('collection', function(voteCollection) {
      // console.log(collection[0].yes)
      assert.equal(voteCollection[0].yes, 1);
      done();
    });
  });

});