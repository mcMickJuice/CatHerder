var MongoClient = require('mongodb').MongoClient;
var Q = require('q');

var createdDate = new Date;

var data = [
  {
    collection: 'users',
    data: [
      {
        username: 'mjoyce',
        fullName: 'Mike Joyce',
        password: '123Fake',
        imageUrl: 'http://exmoorpet.com/wp-content/uploads/2012/08/cat.png'
      },
      {
        username: 'adoff',
        fullName: 'Alex Doffing',
        password: '123Fake',
        imageUrl: 'http://exmoorpet.com/wp-content/uploads/2012/08/cat.png'
      },
      {
        username: 'jchrist',
        fullName: 'Him',
        password: '123Fake',
        imageUrl: 'http://exmoorpet.com/wp-content/uploads/2012/08/cat.png'
      },
      {
        username: 'ffake',
        fullName: 'Sammy Fake',
        password: '123Fake',
        imageUrl: 'http://exmoorpet.com/wp-content/uploads/2012/08/cat.png'
      },
    ]
  },
  {
    collection: 'pools',
    data: [
      {poolName: 'my first pool', users: ['mjoyce', 'adoff']},
      {poolName: 'my second pool', users: ['mjoyce', 'adoff']},
      {poolName: 'my third pool', users: ['mjoyce', 'jchrist', 'adoff']}
    ]
  }
];

data.forEach(d => d.data.forEach(d_c => d_c.created = createdDate));

function run(url) {
  url = url || 'mongodb://192.168.33.10:27017/catherder';
  console.log(url)

  MongoClient.connect(url, function (err, db) {
    console.log('connected to database')
    if (err) {
      console.log("Error on connection", err)
      return;
    }

    var promiseChain = data.reduce((prev, nextData) => {
      return prev.then(() => {
        var collection = db.collection(nextData.collection);
        return collection.insertMany(nextData.data)
          .then(res => {
            console.log(`Inserted ${nextData.data.length} records for ${nextData.collection} collection`)
          })
      })
    }, Q());

    promiseChain = promiseChain.then(() => {
        console.log('closing connection');
        db.close()
        return
      })
      .catch(err => console.log('exception with seed', err));

    Q.all([promiseChain]);
  })
}

run(process.env.mongoUrl);