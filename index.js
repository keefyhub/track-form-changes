class TrackFormChanges {
    constructor(forms, options) {
        const defaults = {
            hasChangesClass: "has-changes"
        };

        options = { ...defaults, ...options };

        this.hasChangesClass = options.hasChangesClass;
        this.alertMessage = options.alertMessage;

        window.addEventListener("load", this.trackFormChanges(forms));
        window.addEventListener("beforeunload", (event) => {
            forms.forEach((form) => {
                if (this.hasClass(form, this.hasChangesClass)) {
                    event.preventDefault();
                    event.returnValue = "";

                    console.log("form has changes");
                    return true;
                }

                return false;
            });
        });

        // Remove `hasChangesClass` on submit
        forms.forEach((form) => {
            form.addEventListener("submit", () => {
                if (this.hasClass(form, this.hasChangesClass)) {
                    this.removeClass(form, this.hasChangesClass);
                }
            });
        });
    }

    trackFormChanges(forms) {
        forms.forEach((form) => {
            form.addEventListener("change", (event) => {
                this.addClass(form, this.hasChangesClass)
            });
        });
    }

    hasClass(element, className) {
        return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
    }

    addClass(element, className) {
        return element.classList.add(className);
    }

    removeClass(element, className) {
        return element.classList.remove(className);
    }
}

module.exports = TrackFormChanges;
