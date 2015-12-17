function singleton() {

  var heapAgent = (require('./heapAgent.js'))();


  this.heapAgent = heapAgent;

}

/* ************************************************************************
SINGLETON CLASS DEFINITION
************************************************************************ */
singleton.instance = null;

/**
 * Singleton getInstance definition
 * @return singleton class
 */
singleton.getInstance = function() {
  if (this.instance === null) {
    this.instance = new singleton();
  }
  return this.instance;
}

module.exports = singleton.getInstance();