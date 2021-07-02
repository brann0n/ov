class BusInfo {
    items = [];
    callback = null;

    //https://v0.ovapi.nl/line/

    constructor(onItemsRecieved) {
        var getUrl = window.location;
        this.baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
        this.callback = onItemsRecieved;
    }

    renderItems(targetDomObject) {
        targetDomObject.empty();
        for (let currentItem of this.items) {
            targetDomObject.append('<div class="item bg-grey rounded p-2 mb-2 text-center"></div>');
        };
    }

    dbDownloadItems() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.baseUrl + "api/item",
                type: 'GET',
                success: function (result) {
                    resolve(result);
                },
                error: function (error) {
                    reject(error)
                },
            });
        });
    }

    download() {
        this.dbDownloadItems()
            .then((data) => {
                this.items = data;
                this.callback();
            })
            .catch((error) => {
                console.error(error)
            })
    }

}