class BusInfo {
    items = [];
    callback = null;

    //https://v0.ovapi.nl/line/

    constructor(onItemsRecieved) {
        var getUrl = window.location;
        this.baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
        this.callback = onItemsRecieved;
    }

    render(targetDomObject) {
        targetDomObject.empty();
        for (let currentItem of this.items) {
            targetDomObject.append('<div class="item bg-primary rounded p-2 mb-2 text-white"><div class="row"><div class="col-4 col-sm-4">' + currentItem.value.DataOwnerCode + '</div><div class="col-8 col-sm-8 tableQrName">'+currentItem.value.LineName+'</div></div></div>');
        };
    }

    dbDownloadItems() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.baseUrl + "api/bus",
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