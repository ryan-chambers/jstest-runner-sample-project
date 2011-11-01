var validation = function() {
  var usernameValid = false;

  function isAlphaNumeric(value) {
    return value.search(/[a-zA-Z\d]+$/) != -1;
  };

  return {
    validateAlphaNumeric: function(field) {
      return isAlphaNumeric(field.val());
    },

	validateUsername : function (field) {
		var username = field.val().replace(/\+/, '!');

		if('' === username) {
			return false;
		}

		usernameValid = false;
		$.ajax({
			type: 'POST',
			url: '/validateUserName',
			async: false,
			data : {
				alias : escape(username)
			},
			success : function(result) {
				if(result != null) {
					var resultNode = result.getElementsByTagName('username');
					if(resultNode.item(0) != null) {
						var resultMessage = resultNode.item(0).firstChild.nodeValue;
						if('valid' === resultMessage) {
							usernameValid = true;
						} else if ('error : username contains spaces' === resultMessage) {
						} else if ('error : username contains invalid characters' === resultMessage) {
						} else if ('error : username already used' === resultMessage) {
						} else {
						}
					}
				} else {
				}
			}
		});

		return usernameValid;
	},

	isUsernameValid : function() {
		return usernameValid;
	},

    reset : function() {
    	usernameValid = false;
    }
  };
}();
