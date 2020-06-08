var assert = require('assert')
var dataObserver = require('../microservices/data observer.js')

describe('data observer.js', function() { 

  describe('start_db_conn()', function() {
    it('STARTING DATABASE CONNECTION', async function() {
       //Used so we can use sleep function
       this.timeout(30000)
       try{
         dataObserver.start()
         await sleep(5000)
       }
       catch(e){
         console.log(e)
       }
    })
  })

  describe('notify_test1()', function() {
    it('NEW SELECT CHECK', async function() {
      //Used so we can use sleep function
      this.timeout(30000)

      //Prepare json
      const jsonTest = {ID : 'B-1', Country : 'deteleThisLater'}
      const originalValues = await dataObserver.getValuesByName("Country")

      //Add random select with new value
      dataObserver.notify(jsonTest)

      //wait 2 seconds
      await sleep(2000)
      
      //Check if it was really changed in db
      const new_values = await dataObserver.getValuesByName("Country")
      const expected = originalValues.replace("]",",\"deteleThisLater\"]")
      assert.equal(new_values,expected) 

      //Delete value after the new value
      restoreDatabase("Country", originalValues)
    })
  })

  describe('notify_test2()', function() {
    it('NEW SlIDER CHECK', async function() {
      //Used so we can use sleep function
      this.timeout(30000)

      //Prepare json
      const jsonTest = {ID : 'B-1', TMC : '400000'}
      const originalValues = await dataObserver.getValuesByName("TMC")

      //Add random sllider with new value
      dataObserver.notify(jsonTest)

      //wait 2 seconds
      await sleep(2000)
      
      //Check if it was really changed in db
      const new_values = await dataObserver.getValuesByName("TMC")
      const expected = originalValues.replace(/,\"(.)*\"]/,",\"400000\"]")
      assert.equal(new_values,expected) 

      //Delete value after the new value
      await sleep(2000)
      restoreDatabase("TMC", originalValues)
    })
  })

  describe('notify_test3()', function() {
    it('NEW DATE CHECK', async function() {
      //Used so we can use sleep function
      this.timeout(30000)

      //Prepare json
      const jsonTest = {ID : 'B-1', Weather_Timestamp : '2031-02-08'}
      const originalValues = await dataObserver.getValuesByName("Weather_Timestamp")

      //Add random sllider with new value
      dataObserver.notify(jsonTest)

      //wait 2 seconds
      await sleep(2000)
      
      //Check if it was really changed in db
      const new_values = await dataObserver.getValuesByName("Weather_Timestamp")
      const expected = originalValues.replace(/,\"(.)*\"]/,",\"2031-02-08\"]")
      assert.equal(new_values,expected) 

      //Delete value after the new value
      await sleep(2000)
      restoreDatabase("Weather_Timestamp", originalValues)
    })
  })

})

function sleep(time) {
  return new Promise((resolve, reject) => 
  {
    setTimeout(resolve, time)
  })
}

function restoreDatabase(name, originalValues){
  dataObserver.dbModel.updateOne(
      { Name: name },
      { $set: {Values : originalValues} },
      (err, result) => {
        if (err) console.log(err)
    }
  )
}