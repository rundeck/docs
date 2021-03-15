module.exports.RundeckVersion = class RundeckVersion {
    versionString
    versionDate
    colorIdentity
    nameIdentity
    iconIdentity
    appId
    serverName
    serverUuid

    versionData

    constructor(data) {
        this.versionString = data['versionString'];
        this.versionData = {};
        this.versionDate = data['versionDate'];
        this.colorIdentity = data && data.colorIdentity ? data.colorIdentity : 'minorPoint';
        this.nameIdentity = data && data.nameIdentity ? data.nameIdentity : 'majorMinor';
        this.iconIdentity = data && data.iconIdentity ? data.iconIdentity : 'minorPoint';
        this.appId = data && data['appId'] ? data['appId'] : 'Rundeck';
        this.serverName = data && data['serverName'] ? data['serverName'] : null;

        if (this.versionString) {
            this.versionData = this.splitVersion(this.versionString);
        } else if (this.serverUuid) {
            this.versionData = this.splitUUID(this.serverUuid);
        }
    }

    csscolors = [
        "aquamarine",
        "blue",
        "brown",
        "burlywood",
        "chartreuse",
        "coral",
        "deeppink",
        "deepskyblue",
        "fuchsia",
        "gold",
        "green",
        "greenyellow",
        "indigo",
        "khaki",
        "lime",
        "olivedrab",
        "orange",
        "orchid",
        "palevioletred",
        "peachpuff",
        "peru",
        "pink",
        "plum",
        "powderblue",
        "rebeccapurple",
        "red",
        "rosybrown",
        "salmon",
        "sandybrown",
        "silver",
        "skyblue",
        "slategray",
        "springgreen",
        "tan",
        "thistle",
        "turquoise",
        "violet",
        "wheat",
        "yellow",
        "yellowgreen"
    ];

    glyphicons = [
        'bell',
        'book',
        'briefcase',
        'bullhorn',
        'camera',
        'cutlery',
        'flag',
        'flash',
        'gift',
        'globe',
        'headphones',
        'leaf',
        'music',
        'paperclip',
        'phone',
        'plane',
        'pushpin',
        'tower',
        'glass',
        'knight',
        'tent',
        'apple',
        'lamp',
        'piggy-bank',
        'grain',
        'sunglasses'
    ];
    //sorted
    glyphicons3 = [
        'apple',
        'bell',
        'book',
        'briefcase',
        'bullhorn',
        'camera',
        'cutlery',
        'flag',
        'flash',
        'gift',
        'glass',
        'globe',
        'grain',
        'headphones',
        'knight',
        'lamp',
        'leaf',
        'music',
        'paperclip',
        'phone',
        'piggy-bank',
        'plane',
        'pushpin',
        'sunglasses',
        'tent',
        'tower'
    ];

    names = [
        'Americano',
        'Cafe Au Lait',
        'Cafe Bonbon',
        'Cafecito',
        'Cafe Cubano',
        'Caffe Latte',
        'Cafe Mocha',
        'Cappuccino',
        'Caramel Latte',
        'Coconut Latte',
        'Con Panna',
        'Doppio Espresso',
        'Dry Cappuccino',
        'Espresso Breve',
        'Eye Opener',
        'Hammerhead',
        'Macchiato',
        'Pumpkin Spice Latte',
        'Ristretto',
        'Solo Espresso',
        'Toffee Latte',
        'Turkish Coffee',
        'Vanilla Latte',
        'Viennese Espresso'
    ];
    names3 = [
        'Antipasto',
        'Bruschetta',
        'Calamari',
        'Deviled egg',
        'Egg roll',
        'Fattoush',
        'Gougère',
        'Hors d\'oeuvre',

        'Jalapeño popper',
        'Mozzarella stick',
        'Nacho',
        'Onion ring',
        'Papadum',
        'Poke',
        'Queso flameado',
        'Rumaki',
        'Saganaki',
        'Spanakopita',
        'Tapas',
        'Vol-au-vent',
        'Xiaolongbao',
        'Zakuski'
    ];
    splitVersion(versionString) {
        var partsa = String(versionString).split(' ');
        var version = partsa.length > 1 ? partsa[0] : versionString;
        var parts = String(version).split('-');
        var vparts = parts[0].split('\.');
        var data = {version: version};
        if (vparts.length > 0) {
            data['major'] = parseInt(vparts[0]);
        } else {
            data['major'] = 0;
        }
        if (vparts.length > 1) {
            data['minor'] = parseInt(vparts[1]);
        } else {
            data['minor'] = 0;
        }
        data['majorMinor'] = (data.major * 10) + data.minor;
        if (vparts.length > 2) {
            data['point'] = parseInt(vparts[2]);
        } else {
            data['point'] = 0;
        }
        data['minorPoint'] = (data.minor * 20) + data.point;
        var release = 1;
        var tag = '';
        if (parts.length > 1 && /^\d+$/.test(parts[1])) {
            release = parseInt(parts[1]);
            tag = parts.length > 2 ? parts.slice(2).join('-') : 'GA';
        } else if (parts.length > 1) {
            tag = parts.slice(1).join('-');
        }

        data['tag'] = tag;
        data['release'] = release;
        data['pointRelease'] = data.point * 20 + release;
        data['minorPointRelease'] = (data.minor * 100) + data.point * 20 + release;
        data['full'] = data.major * 100 + data.minor * 20 + data.point;
        return data;
    }
    splitUUID = function (versionString) {
        var partsa = String(versionString).split('-');
        var apart = partsa.length > 0 ? partsa[0].substring(0, 2) : versionString;
        var data = {uuid:versionString};
        for (var i = 0; i < partsa.length; i++) {
            data['uuid' + i] = parseInt(partsa[i].substring(0, 2), 16);
            data['hexuuid' + i] = partsa[i];
        }
        var partsb = partsa.join('');
        var sixes = [];
        for (var j = 0; (j + 1) * 6 < partsb.length; j++) {
            data['6let' + i] = partsb.substring(j * 6, (j + 1) * 6);
            sixes.push(partsb.substring(j * 6, (j + 1) * 6));
        }
        data['sixes'] = sixes;
        return data;
    };
    inList (list, val) {
        return list[val % list.length];
    };
    colorForVersion(val) {
        return this.inList(this.csscolors, val);
    };
    nameForVersion = (val) => {
        return this.inList(this.names, val);
    };
    nameForVersion3 = (val) => {
        return this.inList(this.names3, val);
    };
    iconForVersion(val) {
        return this.inList(this.glyphicons, val);
    };
    iconForVersion3(val) {
        return this.inList(this.glyphicons3, val);
    };
    data() {
        return this.versionData;
    };
    color() {
        return this.colorForVersion(this.versionData[this.colorIdentity]);
    };
    name() {
        var func = this.versionData.major === 3 ? this.nameForVersion3 : this.nameForVersion;
        return func(this.versionData[this.nameIdentity]);
    };
    icon() {
        return this.iconForVersion3(this.versionData[this.iconIdentity]);
    };
    text() {
        var sep = ' ';
        return [this.name(), this.color(), this.icon()].join(sep).toLowerCase()/*.replace(/[^a-z]/g, sep)*/;
    };

};