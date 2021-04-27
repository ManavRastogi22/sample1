var header = document.getElementById("header-website");
var dropDownMenu = document.getElementById('user-dropdown-menu');
var openMenu = false;

// close menu drop down on click outside
function closePopUps() {
    if (dropDownMenu && dropDownMenu.classList.contains('dropdown-open')) {
        dropDownMenu.classList.remove('dropdown-open');
    }
}

// toggle mobile menu
function unfoldMenu() {
    header.classList.add('visible');
    var children = header.childNodes;
    for (var i=0; i<children.length; i++) {
        var child = children[i];
        if (child.nodeName === 'LI' && child.className !== 'logo' && child.className !== 'hamburger') {
            child.classList.add('visible');
        }
    }
}

function foldMenu() {
    var visibleEls = document.getElementsByClassName("visible");
    while (visibleEls.length > 0) {
        visibleEls[0].classList.remove('visible');
    }
}

function toggleMenu (e) {
    if (e.target) {
      if (e.target.className === 'hamburger'
        || e.target.parentNode.className === 'hamburger') {
        openMenu = !openMenu;
        openMenu ? unfoldMenu() : foldMenu();
      } else if (e.target.id === 'signed-user' || e.target.parentNode.id === 'signed-user') {
        e.stopPropagation();
        if (openMenu && window.matchMedia("(max-width: 1024px)").matches) {
            document.getElementById('account_link').click();
        } else {
            var dropdown = document.getElementById('user-dropdown-menu');
            dropdown.classList.contains('dropdown-open') ? dropdown.classList.remove('dropdown-open') : dropdown.classList.add('dropdown-open');
        } 
      } else if (!e.target.nodeName === 'input') {
        openMenu = false;
        openMenu ? unfoldMenu() : foldMenu();
      }
    }
}

// footer
function toggleFooterSection (e) {
    if (e.target && (e.target.className === 'section-heading' || e.target.parentNode.className === 'section-heading')) {
      //locate section
      let section = e.target.className === 'section-heading' ? e.target.parentNode : e.target.parentNode.parentNode;
      if (section.classList.contains('visible')) {
        section.classList.remove('visible')
      } else {
        section.classList.add('visible')
      }
    }
  }