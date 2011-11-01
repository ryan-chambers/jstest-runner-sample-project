var field;

module("validation", {
	setup : function() {
        field = $('#test_field');
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
    	 	'<?xml version="1.0" encoding="UTF-8"?><username>' + responseCode + '</username>'

    	]);

    	testHandler(server);
    } finally {
       server.restore();
    }
}

test("validateAlphaNumeric valid", function() {
	field.val('aB1');
	var isValid = validation.validateAlphaNumeric(field);
	equal(isValid, true, "aB1 should be a valid alphanumeric value");
});

test("validateAlphaNumeric invalid", function() {
	field.val('!');
	var isValid = validation.validateAlphaNumeric(field);
	equal(isValid, false, "! should not be a valid alphanumeric value");
});

test("validateUsername user name already used", function() {
	testFakeUserValidationWithResponse('error : username already used', function(server) {

    	validation.validateUsername(field);

    	server.respond();

        var isUsernameValid = validation.isUsernameValid();
        equal(isUsernameValid, false, "should have got username already used error");
	});
});

test("validateUsername invalid characters", function() {
	testFakeUserValidationWithResponse('error : username contains invalid characters', function(server) {

    	validation.validateUsername(field);

    	server.respond();

    	var isUsernameValid = validation.isUsernameValid();
    	equal(isUsernameValid, false, "should have got username contains invalid characters error");
	});
});

test("validateUsername username has spaces", function() {
	testFakeUserValidationWithResponse('error : username contains spaces', function(server) {

    	validation.validateUsername(field);

    	server.respond();

    	var isUsernameValid = validation.isUsernameValid();
    	equal(isUsernameValid, false, 'should have got username has spaces error');
	});
});

test("validateUsername valid", function() {
	testFakeUserValidationWithResponse('valid', function(server) {

    	validation.validateUsername(field);

    	server.respond();

    	var isUsernameValid = validation.isUsernameValid();
    	equal(isUsernameValid, true, 'username should be valid');
	});
});
