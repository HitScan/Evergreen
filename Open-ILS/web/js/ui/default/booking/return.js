dojo.requireLocalization("openils.booking", "pickup_and_return");
var localeStrings = dojo.i18n.getLocalization(
    "openils.booking", "pickup_and_return"
);
var p;

function react_to_pass_in(opts) {
    if (opts && opts.patron_barcode) {
        p.populate({"patron": opts.patron_barcode});

        hide_dom_element(
            document.getElementById("contains_barcode_control")
        );

        document.getElementById("barcode").value = opts.patron_barcode;
        var barcode_type = document.getElementById("barcode_type");
        for (var i in barcode_type.options) {
            if (barcode_type.options[i].value == "patron") {
                barcode_type.selectedIndex = i;
                break;
            }
        }

        p._extra_resetting = function() {
            reveal_dom_element(
                document.getElementById("contains_barcode_control")
            );
        };
    }
}

function my_init() {
    p = new Populator({
        "out": out_bresv,
        "in": in_bresv,
        "patron": document.getElementById("patron_info")
    }, document.getElementById("barcode"));
    init_auto_l10n(document.getElementById("auto_l10n_start_here"));

    setTimeout(
        function() { react_to_pass_in(xulG.bresv_interface_opts); }, 0
    );
}
