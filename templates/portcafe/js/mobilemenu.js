function mobileMenu(mobileMenu){
    //var mainNav = mobileMenu;
    var mobileMenuHeader = mobileMenu.querySelector('.mobilemenu-header');
    var mobileMenuMenu = mobileMenu.querySelector('.mobilemenu-menu');
    var mainNav = mobileMenu.querySelector('.mobilemenu-menu').children[0];
    var mobileDivCounter = 0;

    //Функция - Открытие дочернего меню
    //attributeName - в этой переменной содержится идентификатор
    //      того блока див (дочернее меню), который должен открыться.
    var onClickNextMenu = function(event){
        event.preventDefault();

        //Открытие дочернего меню
        attributeName = this.getAttribute('data-target');
        mainNav.querySelector(attributeName).classList.remove('mm-hidden');
        mainNav.querySelector(attributeName).classList.add('mm-visibility');

        //ЗАкрытие родительского меню
        var parentDiv = this.parentElement.parentElement.parentElement;
        parentDiv.classList.add('mm-hidden-to-left');
        parentDiv.classList.remove('mm-visibility');

    }

    //Функция - назад к родительскому меню
    //attributeName - идентификатор родительского меню.
    var onClickBackMenu = function(event){
        event.preventDefault();
        var parentDiv = this.parentElement;
        //Закрытие дочернего-текущего меню
        parentDiv.classList.add('mm-hidden');
        parentDiv.classList.remove('mm-visibility');

        //Открытие родительского меню
        attributeName = this.getAttribute('data-back');
        mainNav.querySelector(attributeName).classList.add('mm-visibility');
        mainNav.querySelector(attributeName).classList.remove('mm-hidden-to-left');

    }

    function Next(n) {
        if (n.getElementsByTagName('ul').length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function rec(ParentElement,MDcounter,parentCounter)
    {
        var mdc = MDcounter;

        if(ParentElement.getElementsByTagName('ul').length > 0)
        {
            var el = ParentElement.getElementsByTagName('ul')[0].children;

            if( el.length > 0 )
            {
                var mobileMenuDiv = document.createElement('div');
                var mmid = "mm-"+ mdc;//MDcounter;
                mobileMenuDiv.id = mmid;
                if (MDcounter > 0) mobileMenuDiv.classList.add("mm-hidden");
                mobileMenuDiv.classList.add("mm-panels");
                mainNav.appendChild(mobileMenuDiv);

                if (mdc != 0) {
                    var mobileMenuHref = document.createElement('a');
                    var parent = "mm-" + parentCounter;
                    mobileMenuHref.setAttribute('href', '#' + parent);
                    mobileMenuHref.setAttribute('data-back', '#' + parent);
                    mobileMenuDiv.appendChild(mobileMenuHref);


                    if (ParentElement.firstElementChild.matches('a')) {
                        ParentElement.firstElementChild.setAttribute('data-target', '#' + mmid);
                        ParentElement.firstElementChild.setAttribute('href', '#' + mmid);
                        mobileMenuHref.innerHTML = ParentElement.firstElementChild.innerHTML;
                    }
                }
                if (mdc == 0) {
                    //mobileMenuHref.classList.add('mm-title');
                } else {
                    mobileMenuHref.classList.add('mm-prev');
                }

                for(var i = 0; i < el.length; i++)
                {
                    if(el[i].matches('li'))
                    {
                        if( Next(el[i]) ) {
                            var pc = mdc;
                            var mdc2 = mdc;
                            mdc2 = mdc2+1;
                            el[i].firstElementChild.classList.add('mm-next');
                            rec(el[i],++mobileDivCounter,pc);
                        }
                    }
                }

                var newList = ParentElement.getElementsByTagName('ul')[0].cloneNode(true);
                mobileMenuDiv.appendChild(newList);
                ParentElement.removeChild(ParentElement.getElementsByTagName('ul')[0])
            }
        }
    }
    rec(mainNav,mobileDivCounter,mobileDivCounter);

    var allDataTargetsLinks = mainNav.querySelectorAll("a[data-target^='#mm-']");

    var allDataBacksLinks = mainNav.querySelectorAll("a[data-back^='#mm-']");

    for (var i = 0; i<allDataTargetsLinks.length; i++){
        allDataTargetsLinks[i].addEventListener('click', onClickNextMenu);
    }

    for (var i = 0; i<allDataBacksLinks.length; i++){
        allDataBacksLinks[i].addEventListener('click', onClickBackMenu);
    }

    //Устанавливаем высоту навигационного меню
    mobileMenuMenu.style.height = mobileMenu.offsetHeight - mobileMenuHeader.offsetHeight+'px';
    window.addEventListener('resize',function(){
        mobileMenuMenu.style.height = mobileMenu.offsetHeight - mobileMenuHeader.offsetHeight+'px';
    })
}