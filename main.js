document.getElementById('risk-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const budget = document.getElementById('budget').value;
    const duration = document.getElementById('duration').value;
    const resources = document.getElementById('resources').value;

    // التحقق من أن المدخلات صحيحة
    if (!budget || !duration || !resources) {
        document.getElementById('risk-result').innerText = "يرجى ملء جميع الحقول";
        document.getElementById('risk-result').style.color = "red";
        return;
    }

    try {
        // إرسال البيانات إلى API
        const response = await fetch('http://localhost:3000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                budget: parseFloat(budget),
                duration: parseInt(duration),
                resources: parseInt(resources)
            })
        });

        const data = await response.json();

        // عرض النتيجة بناءً على استجابة الـ API
        if (response.ok) {
            document.getElementById('risk-result').innerText = data.risk;
            document.getElementById('risk-result').style.color = data.risk === "مخاطر عالية" ? "red" : "green";
        } else {
            document.getElementById('risk-result').innerText = "حدث خطأ. الرجاء المحاولة مرة أخرى.";
            document.getElementById('risk-result').style.color = "red";
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('risk-result').innerText = "حدث خطأ في الاتصال بالخادم.";
        document.getElementById('risk-result').style.color = "red";
    }
});
