const inquiryFileService = (() => {
    const upload = async (formData) => {
        const response = await fetch("file/inquiry/upload", {
            method: "post",
            body: formData
        });
        const file = await response.json();
        return file;
    }

    return {upload:upload}
})()