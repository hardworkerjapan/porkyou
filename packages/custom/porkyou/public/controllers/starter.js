(function () {
  'use strict';

  angular.module('mean.meanStarter')
    .controller('StarterController', StarterController)
    .config(['$translateProvider', function($translateProvider) {

    	// デフォルトは、ブラウザの言語設定に依存する
    	var selectedLanguage = $translateProvider.resolveClientLocale().substr(0,2);
    	// クッキーが設定されている場合は、クッキーの言語にする
    	var $cookies;
		angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
			$cookies = _$cookies_;
		 }]);
		$translateProvider.useStaticFilesLoader({
			prefix: '/meanStarter/assets/i18n/locale-',
			suffix: '.json'
		});

		if($cookies.get('selectedLanguage')) {
			selectedLanguage = $cookies.get('selectedLanguage');
		}
		$translateProvider.preferredLanguage(selectedLanguage);
		$translateProvider.fallbackLanguage('en');
		$translateProvider.useMissingTranslationHandlerLog();
		$translateProvider.useLocalStorage();
		$translateProvider.use(selectedLanguage);
	}]);

  StarterController.$inject = ['$scope', 'Global', '$translate', '$cookies'];

  function StarterController ($scope, Global, $translate, $cookies) {

    $scope.global = Global;
    $scope.package = {
        name: 'meanStarter'
    };

    // 言語の切り替え
    $scope.languages = [
    	{ id: 'en', name: 'ENGLISH' },
    	{ id: 'ja', name: '日本語' }
    ];

    // 言語選択でデフォルトセット
    $scope.selectedLanguage = { id: 'en', name: 'ENGLISH' };
    if($cookies.get('selectedLanguage')) {
    	angular.forEach($scope.languages, function(val, key) {
    		if($translate.proposedLanguage() === val.id) {
    			$scope.selectedLanguage = val;
    		}
    	});
    }
    // 言語の切り替えをクッキーに反映させる
    $scope.setSelectedLanguage = function(selectedLanguage) {
    	var dayForCookies = new Date();
    	// 365日間は言語設定のクッキーを保持
    	dayForCookies.setDate(dayForCookies.getDate() + 365);
    	var cookiesOption = {expires: dayForCookies, path: '/'};
    	$cookies.put('selectedLanguage', selectedLanguage.id, cookiesOption);
    	$translate.use(selectedLanguage.id);
    }
  }
})();

