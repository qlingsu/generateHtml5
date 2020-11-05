export function setNativeOn(arr, event, source, sourceVal) {
    console.info("setNativeOn");
    Array.isArray(arr) && arr.map((component, i) => {
        if (component.nativeOn) {
            component.nativeOn = {
                ...component.nativeOn,
                mousedown: (e) => {
                    source = sourceVal;
                    event(e, i);
                },
            };
        } else {
            component.nativeOn = {
                mousedown: (e) => {
                    source = sourceVal;
                    event(e, i);
                },
            };
        }
    });
    return arr;
}