export default {
    create: function (name, value, days) {
        let expires = '';
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toGMTString()}`;
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    },
    read: function (name) {
        let nameEq = `${name}=`;
        let cookieList = document.cookie.split(';');
        for (let i = 0; i < cookieList.length; i++) {
            let c = cookieList[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEq) === 0) {
                return c.substring(nameEq.length, c.length);
            }
        }
        return null;
    },
    erase: function (name) {
        this.create(name, '', -1);
    },
};