/* =========================================================
   FERRAMENTAS+
   SCRIPT PRINCIPAL
   ========================================================= */


/* =========================
   TEMA
========================= */

const themeBtn =
    document.getElementById("themeToggle") ||
    document.getElementById("themeBtn");

if (themeBtn) {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light")
                ? "light"
                : "dark"
        );

    });

}


/* =========================
   BUSCA
========================= */

const search =
    document.getElementById("toolSearch") ||
    document.getElementById("search");

const cards =
    document.querySelectorAll(".tool-card");

const noResults =
    document.getElementById("noResults");

if (search) {

    search.addEventListener("input", () => {

        const value =
            search.value
                .toLowerCase()
                .trim();

        let found = 0;

        cards.forEach(card => {

            const name =
                (
                    card.dataset.name ||
                    card.textContent ||
                    ""
                )
                .toLowerCase();

            if (name.includes(value)) {

                card.style.display = "";
                found++;

            } else {

                card.style.display = "none";

            }

        });

        if (noResults) {

            noResults.classList.toggle(
                "active",
                found === 0
            );

        }

    });

}


/* =========================
   CATEGORIAS
========================= */

const categories =
    document.querySelectorAll(
        ".category-btn, .category"
    );

categories.forEach(button => {

    button.addEventListener("click", () => {

        categories.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const category =
            button.dataset.category;

        cards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

        if (noResults) {
            noResults.classList.remove("active");
        }

    });

});


/* =========================
   FERRAMENTA ALEATÓRIA
========================= */

const randomTool =
    document.getElementById("randomTool");

if (randomTool) {

    randomTool.addEventListener("click", () => {

        const links = [

            "porcentagem.html",
            "desconto.html",
            "idade.html",
            "dias-entre-datas.html",
            "media.html",
            "juros.html",
            "gerador-senhas.html",
            "qr-code.html",
            "paleta.html",
            "conversor.html"

        ];

        const random =
            links[
                Math.floor(
                    Math.random() *
                    links.length
                )
            ];

        window.location.href = random;

    });

}


/* =========================
   PORCENTAGEM
========================= */

const percentageBtn =
    document.getElementById(
        "percentageBtn"
    );

if (percentageBtn) {

    percentageBtn.addEventListener(
        "click",
        () => {

            const percentage =
                Number(
                    document.getElementById(
                        "percentage"
                    ).value
                );

            const number =
                Number(
                    document.getElementById(
                        "percentageNumber"
                    ).value
                );

            const result =
                document.getElementById(
                    "percentageResult"
                );

            if (
                Number.isNaN(percentage) ||
                Number.isNaN(number)
            ) {

                result.textContent =
                    "Preencha os campos corretamente.";

                return;

            }

            const value =
                number * (percentage / 100);

            result.innerHTML =
                `${percentage}% de ${number} é <strong>${value.toLocaleString(
                    "pt-BR",
                    {
                        maximumFractionDigits: 2
                    }
                )}</strong>.`;

        }
    );

}


/* =========================
   DESCONTO
========================= */

const discountBtn =
    document.getElementById(
        "discountBtn"
    );

if (discountBtn) {

    discountBtn.addEventListener(
        "click",
        () => {

            const price =
                Number(
                    document.getElementById(
                        "discountPrice"
                    ).value
                );

            const discount =
                Number(
                    document.getElementById(
                        "discountPercent"
                    ).value
                );

            const result =
                document.getElementById(
                    "discountResult"
                );

            if (
                Number.isNaN(price) ||
                Number.isNaN(discount) ||
                price < 0 ||
                discount < 0
            ) {

                result.textContent =
                    "Digite valores válidos.";

                return;

            }

            const discountValue =
                price * (discount / 100);

            const finalPrice =
                price - discountValue;

            result.innerHTML = `
                Desconto:
                <strong>
                    R$ ${discountValue.toFixed(2)}
                </strong>
                <br>
                Preço final:
                <strong>
                    R$ ${finalPrice.toFixed(2)}
                </strong>
            `;

        }
    );

}


/* =========================
   IDADE
========================= */

const ageBtn =
    document.getElementById(
        "ageBtn"
    );

if (ageBtn) {

    ageBtn.addEventListener(
        "click",
        () => {

            const birth =
                new Date(
                    document.getElementById(
                        "birthDate"
                    ).value
                );

            const result =
                document.getElementById(
                    "ageResult"
                );

            if (
                Number.isNaN(
                    birth.getTime()
                )
            ) {

                result.textContent =
                    "Informe uma data válida.";

                return;

            }

            const today =
                new Date();

            if (birth > today) {

                result.textContent =
                    "A data de nascimento não pode estar no futuro.";

                return;

            }

            let age =
                today.getFullYear() -
                birth.getFullYear();

            const month =
                today.getMonth() -
                birth.getMonth();

            if (
                month < 0 ||
                (
                    month === 0 &&
                    today.getDate() <
                    birth.getDate()
                )
            ) {

                age--;

            }

            result.innerHTML =
                `Você tem aproximadamente <strong>${age} anos</strong>.`;

        }
    );

}


/* =========================
   DIAS ENTRE DATAS
========================= */

const datesBtn =
    document.getElementById(
        "datesBtn"
    );

if (datesBtn) {

    datesBtn.addEventListener(
        "click",
        () => {

            const first =
                new Date(
                    document.getElementById(
                        "dateFirst"
                    ).value
                );

            const second =
                new Date(
                    document.getElementById(
                        "dateSecond"
                    ).value
                );

            const result =
                document.getElementById(
                    "datesResult"
                );

            if (
                Number.isNaN(
                    first.getTime()
                ) ||
                Number.isNaN(
                    second.getTime()
                )
            ) {

                result.textContent =
                    "Informe as duas datas.";

                return;

            }

            const difference =
                Math.abs(
                    second - first
                );

            const days =
                Math.ceil(
                    difference /
                    (1000 * 60 * 60 * 24)
                );

            result.innerHTML =
                `Existem <strong>${days} dias</strong> entre as datas.`;

        }
    );

}


/* =========================
   MÉDIA
========================= */

const averageBtn =
    document.getElementById(
        "averageBtn"
    );

if (averageBtn) {

    averageBtn.addEventListener(
        "click",
        () => {

            const input =
                document.getElementById(
                    "averageNumbers"
                ).value;

            const result =
                document.getElementById(
                    "averageResult"
                );

            const numbers =
                input
                    .split(/[,\s]+/)
                    .map(value => Number(value))
                    .filter(
                        number =>
                            !Number.isNaN(number)
                    );

            if (!numbers.length) {

                result.textContent =
                    "Digite alguns números.";

                return;

            }

            const sum =
                numbers.reduce(
                    (total, number) =>
                        total + number,
                    0
                );

            const average =
                sum / numbers.length;

            result.innerHTML =
                `Média: <strong>${average.toLocaleString(
                    "pt-BR",
                    {
                        maximumFractionDigits: 2
                    }
                )}</strong>`;

        }
    );

}


/* =========================
   JUROS SIMPLES
========================= */

const interestBtn =
    document.getElementById(
        "interestBtn"
    );

if (interestBtn) {

    interestBtn.addEventListener(
        "click",
        () => {

            const principal =
                Number(
                    document.getElementById(
                        "interestPrincipal"
                    ).value
                );

            const rate =
                Number(
                    document.getElementById(
                        "interestRate"
                    ).value
                );

            const time =
                Number(
                    document.getElementById(
                        "interestTime"
                    ).value
                );

            const result =
                document.getElementById(
                    "interestResult"
                );

            if (
                Number.isNaN(principal) ||
                Number.isNaN(rate) ||
                Number.isNaN(time) ||
                principal <= 0 ||
                rate < 0 ||
                time <= 0
            ) {

                result.textContent =
                    "Digite valores válidos.";

                return;

            }

            const interest =
                principal *
                (rate / 100) *
                time;

            const total =
                principal + interest;

            result.innerHTML = `
                Juros:
                <strong>
                    R$ ${interest.toFixed(2)}
                </strong>
                <br>
                Montante:
                <strong>
                    R$ ${total.toFixed(2)}
                </strong>
            `;

        }
    );

}


/* =========================
   GERADOR DE SENHA
========================= */

const passwordBtn =
    document.getElementById(
        "passwordBtn"
    );

if (passwordBtn) {

    passwordBtn.addEventListener(
        "click",
        () => {

            const length =
                Number(
                    document.getElementById(
                        "passwordLength"
                    ).value
                );

            const result =
                document.getElementById(
                    "passwordResult"
                );

            if (
                !Number.isInteger(length) ||
                length < 4 ||
                length > 100
            ) {

                result.textContent =
                    "Escolha um tamanho entre 4 e 100.";

                return;

            }

            const chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "abcdefghijklmnopqrstuvwxyz" +
                "0123456789" +
                "!@#$%&*_-+=";

            let password = "";

            for (
                let i = 0;
                i < length;
                i++
            ) {

                password +=
                    chars[
                        Math.floor(
                            Math.random() *
                            chars.length
                        )
                    ];

            }

            result.innerHTML =
                `<code>${password}</code>`;

        }
    );

}


/* =========================
   QR CODE
========================= */

const qrBtn =
    document.getElementById(
        "qrBtn"
    );

if (qrBtn) {

    qrBtn.addEventListener(
        "click",
        () => {

            const text =
                document.getElementById(
                    "qrText"
                ).value.trim();

            const result =
                document.getElementById(
                    "qrResult"
                );

            if (!text) {

                result.innerHTML =
                    "Digite um texto ou link.";

                return;

            }

            const encoded =
                encodeURIComponent(text);

            result.innerHTML = `
                <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}"
                    alt="QR Code gerado"
                >
            `;

        }
    );

}


/* =========================
   PALETA DE CORES
========================= */

const paletteBtn =
    document.getElementById(
        "paletteBtn"
    );

if (paletteBtn) {

    paletteBtn.addEventListener(
        "click",
        () => {

            const result =
                document.getElementById(
                    "paletteResult"
                );

            result.innerHTML = "";

            for (
                let i = 0;
                i < 5;
                i++
            ) {

                const color =
                    "#" +
                    Math.floor(
                        Math.random() *
                        16777215
                    )
                    .toString(16)
                    .padStart(6, "0");

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "color-item";

                item.style.background =
                    color;

                item.textContent =
                    color.toUpperCase();

                result.appendChild(item);

            }

        }
    );

}


/* =========================
   CONVERSOR DE UNIDADES
========================= */

const converterBtn =
    document.getElementById(
        "converterBtn"
    );

if (converterBtn) {

    converterBtn.addEventListener(
        "click",
        () => {

            const value =
                Number(
                    document.getElementById(
                        "convertValue"
                    ).value
                );

            const from =
                document.getElementById(
                    "convertFrom"
                ).value;

            const to =
                document.getElementById(
                    "convertTo"
                ).value;

            const result =
                document.getElementById(
                    "convertResult"
                );

            if (Number.isNaN(value)) {

                result.textContent =
                    "Digite um valor válido.";

                return;

            }

            let meters;

            if (from === "m") {
                meters = value;
            }

            if (from === "km") {
                meters = value * 1000;
            }

            if (from === "cm") {
                meters = value / 100;
            }

            if (from === "mm") {
                meters = value / 1000;
            }

            let converted;

            if (to === "m") {
                converted = meters;
            }

            if (to === "km") {
                converted = meters / 1000;
            }

            if (to === "cm") {
                converted = meters * 100;
            }

            if (to === "mm") {
                converted = meters * 1000;
            }

            result.innerHTML =
                `<strong>${converted.toLocaleString(
                    "pt-BR",
                    {
                        maximumFractionDigits: 8
                    }
                )}</strong> ${to}`;

        }
    );

}


/* =========================
   CONTATO
========================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const result =
                document.getElementById(
                    "contactResult"
                );

            if (result) {

                result.textContent =
                    "Formulário preenchido. O envio real será conectado na próxima etapa.";

            }

        }
    );

}