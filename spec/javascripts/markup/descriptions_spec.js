describe('descriptions', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is created', function() {
    // given
    var self = $('form').stepy();

    // when
    var lis = $('.stepy-header li');

    // then
    expect(lis.eq(0).find('span').text()).toEqual('legend 1');
    expect(lis.eq(1).find('span').text()).toEqual('legend 2');
    expect(lis.eq(2).find('span').text()).toEqual('legend 3');
  });
});
