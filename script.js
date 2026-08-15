function showCustomAlert(message) {
    const existingModal = document.getElementById('custom-alert-modal');
    
    if (existingModal) existingModal.remove();

    if (!document.getElementById('custom-alert-style')) {
        const styleElem = document.createElement('style');
        styleElem.id = 'custom-alert-style';
        styleElem.innerHTML = `
            @keyframes customFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes customPopGlow {
                0% { transform: scale(0.5) translateY(-30px); opacity: 0; filter: drop-shadow(0 0 0px #ec4899); }
                70% { transform: scale(1.05) translateY(0); opacity: 1; filter: drop-shadow(0 0 30px #ec4899); }
                100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            @keyframes pulseBorder {
                0%, 100% { border-color: rgba(236, 72, 153, 0.8); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(236, 72, 153, 0.5); }
                50% { border-color: rgba(124, 58, 237, 0.9); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 50px rgba(124, 58, 237, 0.8); }
            }
        `;
        document.head.appendChild(styleElem);
    }

    const overlay = document.createElement('div');
    overlay.id = 'custom-alert-modal';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(10px);
        display: flex; justify-content: center; align-items: center; z-index: 9999;
        animation: customFadeIn 0.3s ease;
    `;

    const modalBox = document.createElement('div');
    modalBox.style.cssText = `
        background: rgba(15, 23, 42, 0.95); border: 2px solid rgba(236, 72, 153, 0.8);
        padding: 30px 25px; border-radius: 16px; width: 380px; max-width: 90%;
        color: #f1f5f9; font-family: inherit; position: relative; text-align: center;
        animation: customPopGlow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), pulseBorder 3s infinite;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute; top: 12px; right: 15px; background: transparent;
        border: none; color: #94a3b8; font-size: 24px; cursor: pointer; transition: color 0.2s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = '#ec4899';
    closeBtn.onmouseout = () => closeBtn.style.color = '#94a3b8';
    closeBtn.onclick = () => overlay.remove();

    const iconElem = document.createElement('div');
    iconElem.innerHTML = '🔥';
    iconElem.style.cssText = `
        font-size: 42px; margin-bottom: 10px; display: inline-block;
        filter: drop-shadow(0 0 12px #ec4899);
    `;

    const textElem = document.createElement('p');
    textElem.textContent = message;
    textElem.style.cssText = `
        margin-top: 5px; margin-bottom: 25px; font-size: 16px; font-weight: 500; line-height: 1.6; color: #f1f5f9;
    `;

    const okBtn = document.createElement('button');
    okBtn.textContent = 'ตกลง';
    okBtn.style.cssText = `
        width: 100%; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #ffffff;
        border: none; padding: 12px; font-size: 15px; font-weight: 600; border-radius: 8px;
        cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4); font-family: inherit;
    `;
    okBtn.onmouseover = () => { okBtn.style.opacity = '0.9'; okBtn.style.transform = 'scale(1.02)'; };
    okBtn.onmouseout = () => { okBtn.style.opacity = '1'; okBtn.style.transform = 'scale(1)'; };
    okBtn.onclick = () => overlay.remove();

    modalBox.appendChild(closeBtn);
    modalBox.appendChild(iconElem);
    modalBox.appendChild(textElem);
    modalBox.appendChild(okBtn);
    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);

    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

function showImageViewer(imgSrc) {
    const existingViewer = document.getElementById('image-viewer-modal');
    if (existingViewer) existingViewer.remove();

    const overlay = document.createElement('div');
    overlay.id = 'image-viewer-modal';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(11, 15, 25, 0.9); backdrop-filter: blur(10px);
        display: flex; justify-content: center; align-items: center; z-index: 10000;
        animation: customFadeIn 0.3s ease;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute; top: 20px; right: 25px; background: transparent;
        border: none; color: #ffffff; font-size: 36px; cursor: pointer; transition: color 0.2s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = '#ec4899';
    closeBtn.onmouseout = () => closeBtn.style.color = '#ffffff';
    closeBtn.onclick = () => overlay.remove();

    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.cssText = `
        max-width: 90%; max-height: 90%; border-radius: 8px;
        border: 1px solid rgba(236, 72, 153, 0.5);
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        object-fit: contain;
    `;

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

function maskData(val) {
    if (!val) return '';
    const clean = val.replace(/[\s-]/g, '');
    if (clean.length >= 10) {
        return clean.slice(0, 3) + '-xxxx-xx' + clean.slice(-1);
    }
    return val;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-card form');
    
    if (form && !document.getElementById('product-input')) {
        const extraFieldsDiv = document.createElement('div');
        extraFieldsDiv.style.cssText = 'margin-bottom: 15px; display: flex; gap: 10px; flex-wrap: wrap;';
        extraFieldsDiv.innerHTML = `
            <input type="text" id="product-input" placeholder="ชื่อสินค้า/บริการที่โดนโกง" style="flex: 2; min-width: 180px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 8px; color: #fff; font-family: inherit; font-size: 14px;">
            <input type="number" id="price-input" placeholder="ราคา (บาท)" style="flex: 1; min-width: 110px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 8px; color: #fff; font-family: inherit; font-size: 14px;">
        `;
        const submitBtnElem = form.querySelector('.btn-submit');
        if (submitBtnElem) {
            form.insertBefore(extraFieldsDiv, submitBtnElem);
        } else {
            form.appendChild(extraFieldsDiv);
        }
    }

    const typeSelectElem = form ? form.querySelector('select') : null;
    let customTypeWrapper = document.getElementById('custom-type-wrapper');

    if (typeSelectElem) {
        if (!Array.from(typeSelectElem.options).some(o => o.value === 'อื่นๆ')) {
            const opt = document.createElement('option');
            opt.value = 'อื่นๆ';
            opt.textContent = 'อื่นๆ (ระบุ)';
            typeSelectElem.appendChild(opt);
        }

        if (!customTypeWrapper) {
            customTypeWrapper = document.createElement('div');
            customTypeWrapper.id = 'custom-type-wrapper';
            customTypeWrapper.style.cssText = 'margin-bottom: 15px; display: none;';
            customTypeWrapper.innerHTML = `
                <input type="text" id="custom-type-input" placeholder="พิมพ์ระบุประเภทการโกง..." style="width: 100%; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 8px; color: #fff; font-family: inherit; font-size: 14px;">
            `;
            typeSelectElem.parentNode.insertBefore(customTypeWrapper, typeSelectElem.nextSibling);
        }

        typeSelectElem.addEventListener('change', () => {
            if (typeSelectElem.value === 'อื่นๆ') {
                customTypeWrapper.style.display = 'block';
            } else {
                customTypeWrapper.style.display = 'none';
                const customInput = document.getElementById('custom-type-input');
                if (customInput) customInput.value = '';
            }
        });
    }

    const scamDatabase = {
        '0812345678': {
            count: 3,
            reports: [
                { type: 'หลอกขายของ', product: 'iPhone 15 Pro Max', price: '32000', date: '12-05-2026 14:00:00', images: [] },
                { type: 'หลอกโอนเงิน', product: 'ลงทุนคริปโตทิพย์', price: '15000', date: '10-05-2026 09:30:00', images: [] },
                { type: 'คอลเซ็นเตอร์', product: 'ค่าปรับพัสดุตกค้าง', price: '2500', date: '01-05-2026 18:15:00', images: [] }
            ]
        },
        '0899999999': {
            count: 1,
            reports: [
                { type: 'หลอกโอนเงิน', product: 'รองเท้าผ้าใบ Limited', price: '4500', date: '15-06-2026 11:20:00', images: [] }
            ]
        },
        '123456789012': {
            count: 2,
            reports: [
                { type: 'หลอกขายของ', product: 'การ์ดจอ RTX 4090', price: '48000', date: '20-04-2026 16:45:00', images: [] },
                { type: 'หลอกโอนเงิน', product: 'ทองรูปพรรณ 1 บาท', price: '41000', date: '18-04-2026 10:10:00', images: [] }
            ]
        }
    };

    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.btn-search');
    const resultCard = document.querySelector('.result-card');
    const alertBox = resultCard.querySelector('.alert-box');

    searchBtn.addEventListener('click', () => {
        const rawQuery = searchInput.value.trim();
        const cleanQuery = rawQuery.replace(/[\s-]/g, '');

        const isPhone = /^0\d{9}$/.test(cleanQuery);
        const isBankAccount = /^\d{10,15}$/.test(cleanQuery);

        if (!rawQuery) {
            showCustomAlert('กรุณากรอกเบอร์โทรศัพท์หรือเลขบัญชีก่อนทำการค้นหา');
            return;
        }

        if (!isPhone && !isBankAccount) {
            showCustomAlert('รูปแบบไม่ถูกต้อง! กรุณากรอกเบอร์โทรศัพท์ (10 หลัก) หรือเลขบัญชีธนาคารให้ครบถ้วน');
            return;
        }

        resultCard.querySelector('h3').textContent = `ผลการค้นหา: ${rawQuery}`;
        const record = scamDatabase[cleanQuery];

        if (record !== undefined) {
            let reportsHtml = '';
            record.reports.forEach(rep => {
                let imgsHtml = '';
                if (rep.images && rep.images.length > 0) {
                    imgsHtml = '<div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">';
                    rep.images.forEach(src => {
                        imgsHtml += `<img src="${src}" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover; border: 1px solid rgba(236,72,153,0.6); cursor: pointer;" onclick="event.stopPropagation(); showImageViewer('${src}');">`;
                    });
                    imgsHtml += '</div>';
                }

                const formattedPrice = rep.price ? Number(rep.price).toLocaleString() : '-';

                reportsHtml += `
                    <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 10px; padding-top: 8px; font-size: 13px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #ec4899; font-weight: 600;">⚠️ ประเภท: ${rep.type}</span>
                            <span style="color: #94a3b8; font-size: 11px;">${rep.date}</span>
                        </div>
                        <div style="margin-top: 4px; color: #f1f5f9;">📦 สินค้า: <strong>${rep.product || '-'}</strong> | 💰 ราคา: <span style="color: #f43f5e; font-weight: 600;">${formattedPrice} บาท</span></div>
                        ${imgsHtml}
                    </div>
                `;
            });

            if (!document.getElementById('danger-box-style')) {
                const styleDanger = document.createElement('style');
                styleDanger.id = 'danger-box-style';
                styleDanger.innerHTML = `
                    @keyframes dangerGlowPulse {
                        0%, 100% {
                            border-color: rgba(244, 63, 94, 0.8);
                            box-shadow: 0 0 15px rgba(244, 63, 94, 0.4), inset 0 0 15px rgba(244, 63, 94, 0.15);
                        }
                        50% {
                            border-color: rgba(236, 72, 153, 1);
                            box-shadow: 0 0 30px rgba(236, 72, 153, 0.7), inset 0 0 25px rgba(236, 72, 153, 0.3);
                        }
                    }
                `;
                document.head.appendChild(styleDanger);
            }

            alertBox.className = 'alert-box danger';
            alertBox.style.cssText = `
                background: linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(15, 23, 42, 0.85) 100%);
                border: 1px solid rgba(244, 63, 94, 0.8);
                border-left: 4px solid #f43f5e;
                border-radius: 12px 2px 12px 2px;
                padding: 18px;
                color: #f1f5f9;
                backdrop-filter: blur(8px);
                animation: dangerGlowPulse 2.5s infinite ease-in-out;
                position: relative;
                overflow: hidden;
            `;
            alertBox.innerHTML = `
                <p style="margin:0; font-size: 15px;">❌ <strong style="color: #ffe4e6;">เบอร์/บัญชี: ${rawQuery}</strong></p>
                <p style="margin: 6px 0 0 0; color: #f43f5e; font-size: 14px; font-weight: 600;">⚠️ พบประวัติการรายงานทั้งหมด <span style="font-size: 18px; text-shadow: 0 0 8px rgba(244,63,94,0.8);">${record.count}</span> ครั้ง!</p>
                <div style="max-height: 220px; overflow-y: auto; margin-top: 12px; padding-right: 4px;">
                    ${reportsHtml}
                </div>
            `;
        } else {
            if (!document.getElementById('safe-box-style')) {
                const styleSafe = document.createElement('style');
                styleSafe.id = 'safe-box-style';
                styleSafe.innerHTML = `
                    @keyframes safeGlowPulse {
                        0%, 100% {
                            border-color: rgba(16, 185, 129, 0.8);
                            box-shadow: 0 0 15px rgba(16, 185, 129, 0.3), inset 0 0 15px rgba(16, 185, 129, 0.1);
                        }
                        50% {
                            border-color: rgba(52, 211, 153, 1);
                            box-shadow: 0 0 30px rgba(52, 211, 153, 0.6), inset 0 0 25px rgba(52, 211, 153, 0.25);
                        }
                    }
                `;
                document.head.appendChild(styleSafe);
            }

            alertBox.className = 'alert-box safe';
            alertBox.style.cssText = `
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.85) 100%);
                border: 1px solid rgba(16, 185, 129, 0.8);
                border-left: 4px solid #10b981;
                border-radius: 12px 2px 12px 2px;
                padding: 18px;
                color: #6ee7b7;
                backdrop-filter: blur(8px);
                animation: safeGlowPulse 2.5s infinite ease-in-out;
                position: relative;
                overflow: hidden;
            `;
            alertBox.innerHTML = `
                <p style="margin: 0; font-size: 15px; color: #a7f3d0;">✅ <strong>เบอร์/บัญชี: ${rawQuery}</strong></p>
                <p style="margin: 6px 0 0 0; font-size: 14px; font-weight: 500;">🛡️ ไม่พบประวัติการโกงในระบบ (เบื้องต้นปลอดภัย)</p>
            `;
        }
    });

    const fileUploadBox = document.querySelector('.file-upload');
    let uploadedFiles = [];
    let previewContainer = null;

    if (fileUploadBox) {
        fileUploadBox.style.cssText = `
            background: transparent;
            border: none;
            padding: 0;
            text-align: left;
            position: relative;
            display: inline-block;
        `;

        const fileInput = fileUploadBox.querySelector('input[type="file"]');
        fileUploadBox.innerHTML = '';

        const uploadArea = document.createElement('div');
        uploadArea.style.cssText = `
            position: relative;
            display: inline-block;
        `;

        const uploadBtn = document.createElement('button');
        uploadBtn.type = 'button';
        uploadBtn.textContent = 'เลือกรูปหลักฐาน';
        uploadBtn.style.cssText = `
            background: linear-gradient(135deg, #7c3aed, #ec4899);
            color: #ffffff;
            border: none;
            padding: 10px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            font-family: inherit;
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
            pointer-events: none;
            display: inline-block;
        `;

        if (fileInput) {
            fileInput.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
                z-index: 10;
            `;
            uploadArea.appendChild(fileInput);
        }

        uploadArea.appendChild(uploadBtn);
        fileUploadBox.appendChild(uploadArea);

        previewContainer = document.createElement('div');
        previewContainer.className = 'preview-container';
        previewContainer.style.cssText = `
            display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; margin-bottom: 15px; justify-content: flex-start;
        `;
        fileUploadBox.parentNode.insertBefore(previewContainer, fileUploadBox.nextSibling);

        function updateFileListAndUI() {
            const dataTransfer = new DataTransfer();
            uploadedFiles.forEach(file => dataTransfer.items.add(file));
            if (fileInput) fileInput.files = dataTransfer.files;

            previewContainer.innerHTML = '';

            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach((file, index) => {
                    const thumbWrapper = document.createElement('div');
                    thumbWrapper.style.cssText = `
                        position: relative; width: 65px; height: 65px;
                    `;

                    const previewImg = document.createElement('img');
                    const objectUrl = URL.createObjectURL(file);
                    previewImg.src = objectUrl;
                    previewImg.style.cssText = `
                        width: 100%; height: 100%; border-radius: 6px; object-fit: cover;
                        border: 1px solid rgba(236, 72, 153, 0.5); cursor: pointer;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s;
                    `;
                    previewImg.onmouseover = () => previewImg.style.transform = 'scale(1.05)';
                    previewImg.onmouseout = () => previewImg.style.transform = 'scale(1)';
                    previewImg.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        showImageViewer(objectUrl);
                    };

                    const deleteBtn = document.createElement('button');
                    deleteBtn.type = 'button';
                    deleteBtn.innerHTML = '&times;';
                    deleteBtn.style.cssText = `
                        position: absolute; top: -5px; right: -5px;
                        background: #ef4444; color: #ffffff; border: none;
                        border-radius: 50%; width: 20px; height: 20px;
                        font-size: 13px; line-height: 18px; text-align: center;
                        cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.5);
                        transition: background 0.2s;
                    `;
                    deleteBtn.onmouseover = () => deleteBtn.style.background = '#dc2626';
                    deleteBtn.onmouseout = () => deleteBtn.style.background = '#ef4444';
                    deleteBtn.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        uploadedFiles.splice(index, 1);
                        updateFileListAndUI();
                    };

                    thumbWrapper.appendChild(previewImg);
                    thumbWrapper.appendChild(deleteBtn);
                    previewContainer.appendChild(thumbWrapper);
                });
            }
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const files = e.target.files;
                for (let i = 0; i < files.length; i++) {
                    uploadedFiles.push(files[i]);
                }
                fileInput.value = '';
                updateFileListAndUI();
            });
        }
    }

    const submitBtn = document.querySelector('.btn-submit');
    const recentCard = document.querySelector('.recent-card');

    submitBtn.addEventListener('click', () => {
        const targetInput = form.querySelector('input[type="text"]').value.trim();
        const typeSelectElem = form.querySelector('select');
        let typeSelect = typeSelectElem ? typeSelectElem.value : '';

        if (typeSelect === 'อื่นๆ') {
            const customTypeInput = document.getElementById('custom-type-input');
            const customVal = customTypeInput ? customTypeInput.value.trim() : '';
            if (customVal) {
                typeSelect = customVal;
            } else {
                showCustomAlert('กรุณาระบุประเภทการโกงในช่องอื่นๆ ให้เรียบร้อย');
                return;
            }
        }

        const productInput = document.getElementById('product-input').value.trim();
        const priceInput = document.getElementById('price-input').value.trim();
        const cleanTarget = targetInput.replace(/[\s-]/g, '');

        if (!targetInput) {
            showCustomAlert('กรุณากรอกเบอร์โทรศัพท์หรือเลขบัญชีที่ต้องการแจ้งรายงาน');
            return;
        }

        const isPhone = /^0\d{9}$/.test(cleanTarget);
        const isBankAccount = /^\d{10,15}$/.test(cleanTarget);

        if (!isPhone && !isBankAccount) {
            showCustomAlert('รูปแบบข้อมูลไม่ถูกต้อง กรุณากรอกเบอร์โทร (10 หลัก) หรือเลขบัญชีให้ถูกต้อง');
            return;
        }

        const now = new Date();
        const timeStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        
        const reportImages = uploadedFiles.map(file => URL.createObjectURL(file));

        if (scamDatabase[cleanTarget]) {
            scamDatabase[cleanTarget].count += 1;
            scamDatabase[cleanTarget].reports.unshift({
                type: typeSelect,
                product: productInput || 'ไม่ระบุชื่อสินค้า',
                price: priceInput || '0',
                date: timeStr,
                images: reportImages
            });
        } else {
            scamDatabase[cleanTarget] = {
                count: 1,
                reports: [
                    {
                        type: typeSelect,
                        product: productInput || 'ไม่ระบุชื่อสินค้า',
                        price: priceInput || '0',
                        date: timeStr,
                        images: reportImages
                    }
                ]
            };
        }

        const maskedTarget = maskData(targetInput);
        const newItem = document.createElement('div');
        
        newItem.className = 'recent-item new-report-flame';
        newItem.innerHTML = `
            <span>${timeStr}<br><small>${maskedTarget}</small></span>
            <span class="badge">${typeSelect}</span>
        `;

        if (recentCard && recentCard.children.length > 1) {
            recentCard.insertBefore(newItem, recentCard.children[1]);
        } else if (recentCard) {
            recentCard.appendChild(newItem);
        }

        if (recentCard) {
            const recentItems = recentCard.querySelectorAll('.recent-item');
            if (recentItems.length > 5) {
                recentItems[recentItems.length - 1].remove();
            }
        }

        showCustomAlert('ส่งรายงานเข้าระบบเรียบร้อยแล้ว');
        form.reset();
        document.getElementById('product-input').value = '';
        document.getElementById('price-input').value = '';
        if (document.getElementById('custom-type-input')) {
            document.getElementById('custom-type-input').value = '';
        }
        if (customTypeWrapper) {
            customTypeWrapper.style.display = 'none';
        }
        uploadedFiles = [];
        if(previewContainer) previewContainer.innerHTML = '';
    });

    // === Scroll Reveal Effect สำหรับการ์ด HOW IT WORKS และ TERMS & CONDITIONS ===
    if (!document.getElementById('scroll-reveal-style')) {
        const styleReveal = document.createElement('style');
        styleReveal.id = 'scroll-reveal-style';
        styleReveal.innerHTML = `
            .reveal-card {
                opacity: 0;
                transform: translateY(40px) scale(0.95);
                transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                will-change: transform, opacity;
            }
            .reveal-card.active {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        `;
        document.head.appendChild(styleReveal);
    }

    const cardsToAnimate = document.querySelectorAll('.how-it-works .card, .terms-conditions .card, .how-it-works div[class*="card"], .terms div[class*="card"]');
    const targetCards = cardsToAnimate.length > 0 ? cardsToAnimate : document.querySelectorAll('.features-grid > div, .terms-grid > div');

    targetCards.forEach((card) => {
        card.classList.add('reveal-card');
    });

    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const cardIndex = Array.from(targetCards).indexOf(card) % 3; 
                
                setTimeout(() => {
                    card.classList.add('active');
                }, cardIndex * 150);

                observer.unobserve(card);
            }
        });
    }, observerOptions);

    targetCards.forEach(card => cardObserver.observe(card));

    // === โค้ดดัก Scroll ย้ายเข้ามาในนี้แก้พังเรียบร้อย ===
    let lastScrollTop = 0;
    const emergencyBox = document.getElementById('emergencyBox');

    if (emergencyBox) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let windowHeight = window.innerHeight;
            let documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight - 60) {
                emergencyBox.classList.remove('hide');
                emergencyBox.classList.add('minimized');
            } else if (scrollTop > lastScrollTop && scrollTop > 100) {
                emergencyBox.classList.add('hide');
                emergencyBox.classList.remove('minimized');
            } else {
                emergencyBox.classList.remove('hide');
                emergencyBox.classList.remove('minimized');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
});