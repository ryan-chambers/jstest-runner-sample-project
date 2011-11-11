module("validation", {
	setup : function() {
        this.field = $('#test_field');
		validation.reset();
	},
	tearDown: function () {
        this.xhr.restore();
    }
});

function testFakeUserValidationWithResponse(responseCode, testHandler) {
	var server = sinon.fakeServerWithClock.create();
	try {
        server.respondWith([
    	 	200,
    	 	{ "Content-Type": "text/xml" },
    	 	'<?xml version="1.0" encoding="UTF-8"?><result>' + responseCode + '</result>'
    	]);

    	testHandler(server);
    } finally {
       server.restore();
    }
}

test("validateAlphaNumeric valid", function() {
	this.field.val('aB1');
	var isValid = validation.validateAlphaNumeric(this.field);
	equal(isValid, true, "aB1 should be a valid alphanumeric value");
});

test("validateAlphaNumeric invalid", function() {
	this.field.val('!');
	var isValid = validation.validateAlphaNumeric(this.field);
	equal(isValid, false, "! should not be a valid alphanumeric value");
});

test("validateUsername user name already used", function() {
	var that = this;
	testFakeUserValidationWithResponse('username_already_used', function(server) {

    	validation.validateUsername(that.field);

    	server.respond();

        var isUsernameValid = validation.isUsernameValid();
        equal(isUsernameValid, false, "should have got username already used error");
	});
});

test("validateUsername valid", function() {
	var that = this;
	testFakeUserValidationWithResponse('valid', function(server) {

    	validation.validateUsername(that.field);

    	server.respond();

    	var isUsernameValid = validation.isUsernameValid();
    	equal(isUsernameValid, true, 'username should be valid');
	});
});
