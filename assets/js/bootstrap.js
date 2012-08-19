var apiHost = 'http://localhost:8000';

var UserViewModel = function() {
	var self = this;
	self.userName  = ko.observable();
	self.firstName = ko.observable();
	self.lastName  = ko.observable();
	self.notificationTitle = ko.observable();
	self.notificationBody =ko.observable();
	self.notificationCount = ko.observable();
	self.fullName  = ko.computed(function() {
		return self.firstName() + " " + self.lastName();
	}, this);
	
	self.build = function(data) {
		self.userName(data.user.username);
		self.firstName(data.user.first_name);
		self.lastName(data.user.last_name);
		if(data.notification!=null){
			var notification = data.notification;
			self.notificationCount(notification.unread_count);
			self.notificationTitle(notification.title);
			self.notificationBody(notification.body);
		}
	};
};

function EndPoint(url) {
	this.url = url;

	this.get = function(buildFunction,params) {
		params = ( typeof params === "undefined") ? [] : params;
		$.get(url, params, buildFunction);
	};

	this.post = function(postdata) {

	};

};

$(document).ready(function() {
	$.i18n.init({resGetPath: 'i18n/__lng__.json',lng:'en-US', debug: true}, function(t){$("body").i18n();});
	var data = new EndPoint(apiHost.concat('/api/v1/me'));
	viewModel = new UserViewModel();
	ko.applyBindings(viewModel);
	data = data.get(viewModel.build);
});

