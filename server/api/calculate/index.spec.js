'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var calculateCtrlStub = {
  index: 'calculateCtrl.index',
  show: 'calculateCtrl.show',
  create: 'calculateCtrl.create',
  update: 'calculateCtrl.update',
  destroy: 'calculateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var calculateIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './calculate.controller': calculateCtrlStub
});

describe('Calculate API Router:', function() {

  it('should return an express router instance', function() {
    calculateIndex.should.equal(routerStub);
  });

  describe('GET /api/calculates', function() {

    it('should route to calculate.controller.index', function() {
      routerStub.get
        .withArgs('/', 'calculateCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/calculates/:id', function() {

    it('should route to calculate.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'calculateCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/calculates', function() {

    it('should route to calculate.controller.create', function() {
      routerStub.post
        .withArgs('/', 'calculateCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/calculates/:id', function() {

    it('should route to calculate.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'calculateCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/calculates/:id', function() {

    it('should route to calculate.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'calculateCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/calculates/:id', function() {

    it('should route to calculate.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'calculateCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
