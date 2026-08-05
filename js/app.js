/**
 * RG Pet Digital - Lógica do Sistema e Recursos Interativos
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mapeamento de Elementos do DOM e Estado Inicial ---
    const inputs = {
        name: document.getElementById('petName'),
        species: document.getElementById('species'),
        breed: document.getElementById('breed'),
        furType: document.getElementById('furType'),
        sex: document.getElementById('sex'),
        color: document.getElementById('color'),
        weight: document.getElementById('weight'),
        microchip: document.getElementById('microchip'),
        noMicrochip: document.getElementById('no-microchip'),
        tutor: document.getElementById('tutorName'),
        phone: document.getElementById('phone')
    };

    const previews = {
        name: document.getElementById('preview-name'),
        species: document.getElementById('preview-species'),
        breed: document.getElementById('preview-breed'),
        pelagem: document.getElementById('preview-pelagem'),
        sex: document.getElementById('preview-sex'),
        color: document.getElementById('preview-color'),
        weight: document.getElementById('preview-weight'),
        microchip: document.getElementById('preview-microchip'),
        tutor: document.getElementById('preview-tutor'),
        phone: document.getElementById('preview-phone'),
        rga: document.getElementById('preview-rga'),
        qrImg: document.getElementById('preview-qr-img'),
        issueDate: document.getElementById('preview-issue-date')
    };

    // Elementos do Modal
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const modalOk = document.getElementById('modal-ok');

    // Links de navegação e ScrollSpy Ativo
    const navLinks = document.querySelectorAll('#nav-links .nav-link');
    const sections = [
        { id: 'top', element: document.getElementById('top') },
        { id: 'rg-generator', element: document.getElementById('rg-generator') },
        { id: 'saude-info', element: document.getElementById('saude-info') },
        { id: 'campanha', element: document.getElementById('campanha') }
    ];

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 200;
        let currentSectionId = 'top';

        sections.forEach(sec => {
            if (sec.element && scrollPosition >= sec.element.offsetTop) {
                currentSectionId = sec.id;
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.className = 'nav-link text-primary text-sm font-body-lg font-bold uppercase bg-accent px-2.5 py-1 brutal-border shadow-brutal-sm transform rotate-1 transition-all';
            } else {
                link.className = 'nav-link text-primary text-sm font-body-lg font-bold uppercase hover:bg-white hover:text-black px-2.5 py-1 brutal-border transition-all';
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Controle de estado do agendamento
    let isCalendarAdded = false;

    /**
     * Retorna a data atual formatada (DD/MM/AAAA)
     */
    function getFormattedCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }

    /**
     * Gera o número de registro RGA com base nos dados preenchidos
     */
    function generateRGANumber(petName, tutorName) {
        const rawStr = (petName + tutorName).toLowerCase();
        let hash = 0;
        for (let i = 0; i < rawStr.length; i++) {
            hash = (hash << 5) - hash + rawStr.charCodeAt(i);
            hash |= 0;
        }
        const absHash = Math.abs(hash).toString().padStart(8, '7391').slice(0, 8);
        return `2027.${absHash.slice(0, 4)}.${absHash.slice(4, 8)}`;
    }

    // --- 2. Atualização em Tempo Real da Carteirinha ---
    function updatePreview() {
        if (!previews.name) return;

        // Data de emissão dinâmica (data de hoje)
        const todayFormatted = getFormattedCurrentDate();
        if (previews.issueDate) previews.issueDate.textContent = todayFormatted;

        // Ajuste de tamanho do nome do pet sem cortar texto
        const nameVal = inputs.name.value.trim() || 'Rex';
        previews.name.textContent = nameVal;
        if (nameVal.length > 22) {
            previews.name.className = "font-display-lg text-[9px] sm:text-[10px] leading-tight font-black text-primary uppercase break-words whitespace-normal";
        } else if (nameVal.length > 14) {
            previews.name.className = "font-display-lg text-[11px] sm:text-xs leading-tight font-black text-primary uppercase break-words whitespace-normal";
        } else {
            previews.name.className = "font-display-lg text-xs sm:text-sm leading-tight font-black text-primary uppercase break-words whitespace-normal";
        }

        // Helper para ajustar tamanho e quebra de linha de textos longos nos campos da carteirinha
        function updateFieldWithDynamicFont(element, text, defaultVal) {
            if (!element) return;
            const val = (text || '').trim() || defaultVal;
            element.textContent = val;
            if (val.length > 18) {
                element.className = "text-[7px] sm:text-[8px] font-display-lg font-bold text-primary uppercase leading-tight break-words whitespace-normal";
            } else if (val.length > 11) {
                element.className = "text-[8px] sm:text-[9px] font-display-lg font-bold text-primary uppercase leading-tight break-words whitespace-normal";
            } else {
                element.className = "text-[10px] sm:text-xs font-display-lg font-bold text-primary uppercase leading-tight break-words whitespace-normal";
            }
        }

        // Espécie, Raça, Sexo, Pelagem, Cor e Peso
        const speciesVal = inputs.species.value;
        previews.species.textContent = speciesVal === 'Canina' ? 'Canina' : (speciesVal === 'Felina' ? 'Felina' : 'Outro');
        updateFieldWithDynamicFont(previews.breed, inputs.breed.value, 'SRD');
        if (previews.pelagem) updateFieldWithDynamicFont(previews.pelagem, inputs.furType ? inputs.furType.value : '', 'Pelo Liso');
        previews.sex.textContent = inputs.sex.value || 'Macho';
        updateFieldWithDynamicFont(previews.color, inputs.color.value, 'Caramelo');
        previews.weight.textContent = inputs.weight.value.trim() ? `${inputs.weight.value} kg` : '---';

        // Lógica do microchip
        if (inputs.noMicrochip && inputs.noMicrochip.checked) {
            previews.microchip.textContent = 'Não possui';
        } else {
            previews.microchip.textContent = inputs.microchip.value.trim() || '---';
        }

        // Ajuste de tamanho do nome do tutor
        const tutorVal = inputs.tutor.value.trim() || 'Seu Nome';
        previews.tutor.textContent = tutorVal;
        if (tutorVal.length > 22) {
            previews.tutor.className = "text-[9px] sm:text-[10px] font-display-lg font-bold uppercase leading-tight text-primary break-words whitespace-normal";
        } else {
            previews.tutor.className = "text-xs sm:text-sm font-display-lg font-bold uppercase leading-tight text-primary break-words whitespace-normal";
        }

        // Telefone de contato
        const phoneVal = inputs.phone.value.trim() || '(00) 00000-0000';
        previews.phone.textContent = phoneVal;

        // Atualização do RGA dinâmico
        const rgaNumber = generateRGANumber(nameVal, tutorVal);
        if (previews.rga) previews.rga.textContent = rgaNumber;

        // Geração do QR Code real apenas quando houver dados preenchidos pelo tutor
        if (previews.qrImg) {
            const qrPlaceholderIcon = document.getElementById('qr-placeholder-icon');
            const hasCustomData = inputs.name.value.trim().length > 0 || 
                                  inputs.tutor.value.trim().length > 0 || 
                                  inputs.breed.value.trim().length > 0 || 
                                  inputs.color.value.trim().length > 0 ||
                                  inputs.phone.value.trim().length > 0;

            if (hasCustomData) {
                const breedVal = inputs.breed.value.trim() || 'SRD';
                const furVal = (inputs.furType && inputs.furType.value.trim()) || 'Pelo Liso';
                const sexVal = inputs.sex.value || 'Macho';
                const colorVal = inputs.color.value.trim() || 'Caramelo';
                const weightVal = inputs.weight.value.trim() ? `${inputs.weight.value} kg` : 'Não informado';
                const microchipVal = (inputs.noMicrochip && inputs.noMicrochip.checked) ? 'Não possui' : (inputs.microchip.value.trim() || 'Não informado');

                const qrText = [
                    `--- RG PET DIGITAL ---`,
                    `RGA: ${rgaNumber}`,
                    `PET: ${nameVal}`,
                    `ESPÉCIE: ${speciesVal}`,
                    `RAÇA: ${breedVal}`,
                    `PELAGEM: ${furVal}`,
                    `COR: ${colorVal}`,
                    `SEXO: ${sexVal}`,
                    `PESO: ${weightVal}`,
                    `MICROCHIP: ${microchipVal}`,
                    `TUTOR: ${tutorVal}`,
                    `CONTATO: ${phoneVal}`,
                    `MUNICÍPIO: Nova Mamoré - RO`,
                    `EMISSÃO: ${todayFormatted}`
                ].join('\n');

                const qrData = encodeURIComponent(qrText);
                previews.qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;
                previews.qrImg.classList.remove('hidden');
                previews.qrImg.classList.add('block');
                if (qrPlaceholderIcon) qrPlaceholderIcon.classList.add('hidden');
            } else {
                previews.qrImg.classList.add('hidden');
                previews.qrImg.classList.remove('block');
                if (qrPlaceholderIcon) qrPlaceholderIcon.classList.remove('hidden');
            }
        }
    }

    // Vincula ouvintes de eventos nos campos do formulário
    Object.values(inputs).forEach(input => {
        if (input) {
            input.addEventListener('input', updatePreview);
            if (input.type === 'checkbox') {
                input.addEventListener('change', updatePreview);
            }
        }
    });

    // Executa a primeira renderização
    updatePreview();

    // --- 3. Carregamento e Ajuste de Fotos (Pet e Tutor) ---
    const fileUpload = document.getElementById('file-upload');
    const previewPhotoArea = document.getElementById('preview-photo');

    if (fileUpload && previewPhotoArea) {
        fileUpload.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewPhotoArea.style.backgroundImage = `url('${e.target.result}')`;
                    previewPhotoArea.style.backgroundSize = 'cover';
                    previewPhotoArea.style.backgroundPosition = 'center';
                    previewPhotoArea.style.backgroundRepeat = 'no-repeat';
                    previewPhotoArea.classList.remove('hidden');
                    previewPhotoArea.classList.add('block');

                    const fileLabelText = document.getElementById('file-label-text');
                    if (fileLabelText) fileLabelText.textContent = 'Foto Adicionada ✓';
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    const includeTutorToggle = document.getElementById('include-tutor-photo');
    const tutorPhotoUploadArea = document.getElementById('tutor-photo-upload-area');
    const previewTutorPhotoContainer = document.getElementById('preview-tutor-photo-container');
    const tutorFileUpload = document.getElementById('tutor-file-upload');
    const previewTutorPhoto = document.getElementById('preview-tutor-photo');

    if (includeTutorToggle) {
        includeTutorToggle.addEventListener('change', function () {
            if (this.checked) {
                tutorPhotoUploadArea?.classList.remove('hidden');
                tutorPhotoUploadArea?.classList.add('flex');
                previewTutorPhotoContainer?.classList.remove('hidden');
                previewTutorPhotoContainer?.classList.add('flex');
            } else {
                tutorPhotoUploadArea?.classList.add('hidden');
                tutorPhotoUploadArea?.classList.remove('flex');
                previewTutorPhotoContainer?.classList.add('hidden');
                previewTutorPhotoContainer?.classList.remove('flex');
            }
        });
    }

    if (tutorFileUpload && previewTutorPhoto) {
        tutorFileUpload.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewTutorPhoto.style.backgroundImage = `url('${e.target.result}')`;
                    previewTutorPhoto.style.backgroundSize = 'cover';
                    previewTutorPhoto.style.backgroundPosition = 'center';
                    previewTutorPhoto.style.backgroundRepeat = 'no-repeat';
                    previewTutorPhoto.classList.remove('hidden');
                    previewTutorPhoto.classList.add('block');

                    const tutorFileLabelText = document.getElementById('tutor-file-label-text');
                    if (tutorFileLabelText) tutorFileLabelText.textContent = 'Foto Adicionada ✓';
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // --- 4. Controle da Barra de Navegação ---
    function setActiveNavLink(clickedLink) {
        navLinks.forEach(link => {
            link.className = "nav-link text-primary text-sm font-body-lg font-bold uppercase hover:bg-white hover:text-black px-2.5 py-1 brutal-border transition-colors";
        });
        if (clickedLink) {
            clickedLink.className = "nav-link text-primary text-sm font-body-lg font-bold uppercase bg-accent px-2.5 py-1 brutal-border shadow-brutal-sm transform rotate-1";
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            setActiveNavLink(this);
        });
    });

    // --- 5. Funções de Controle dos Modais ---
    function openModal(title, htmlContent) {
        if (!modalContainer) return;
        modalTitle.textContent = title;
        modalBody.innerHTML = htmlContent;
        modalContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modalContainer) return;
        modalContainer.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOk) modalOk.addEventListener('click', closeModal);
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer && !modalContainer.classList.contains('hidden')) {
            closeModal();
        }
    });

    // --- 6. Integração com Calendário e Impressão ---
    const btnAgenda = document.getElementById('btn-agenda');
    const btnBaixar = document.getElementById('btn-baixar');
    const btnDownloadPreview = document.getElementById('btn-download-preview');
    const statusMsg = document.getElementById('status-msg');

    function unlockDownloadButton() {
        isCalendarAdded = true;
        if (btnBaixar) {
            btnBaixar.disabled = false;
            btnBaixar.classList.remove('bg-gray-200', 'border-gray-400', 'text-gray-500', 'cursor-not-allowed');
            btnBaixar.classList.add('bg-white', 'text-primary', 'border-primary', 'shadow-brutal', 'hover:shadow-brutal-hover', 'hover:-translate-y-0.5', 'active:shadow-brutal-active', 'active:translate-y-0.5', 'cursor-pointer', 'transform', 'rotate-2');
            btnBaixar.innerHTML = '<span class="material-symbols-outlined font-bold text-xl">download</span> BAIXAR RG PET DIGITAL';
        }
        if (statusMsg) {
            statusMsg.textContent = 'LIBERADO! YAY!';
            statusMsg.classList.add('bg-secondary');
            statusMsg.classList.replace('rotate-2', '-rotate-2');
        }
    }

    // Abre o Google Agenda para adicionar o lembrete
    if (btnAgenda) {
        btnAgenda.addEventListener('click', () => {
            const petName = inputs.name.value.trim() || 'seu pet';
            const title = encodeURIComponent(`Vacinação Anual do Pet (${petName})`);
            const details = encodeURIComponent(`Confira se a vacina antirrábica do pet ${petName} precisa ser renovada este ano. Caso ele já tenha sido vacinado nos últimos 12 meses, não é necessário vacinar novamente agora. Acompanhe as datas e locais divulgados pela Prefeitura e Secretaria de Saúde de Nova Mamoré - RO!`);
            const location = encodeURIComponent('Pontos divulgados pela Secretaria de Saúde de Nova Mamoré - RO');
            const dates = '20270512T090000Z/20270512T170000Z';
            
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;

            // Abre o Google Agenda em nova aba
            window.open(googleCalendarUrl, '_blank');

            // Marca o botão como concluído e desbloqueia o download
            btnAgenda.innerHTML = '<span class="material-symbols-outlined font-bold text-xl">check_circle</span> ADICIONADO À AGENDA!';
            btnAgenda.classList.replace('bg-secondary', 'bg-white');
            unlockDownloadButton();
        });
    }

    /**
     * Dispara a impressão direta da carteirinha de prévia
     */
    function triggerDirectPrint() {
        window.print();
    }

    // Clique no botão de Download abaixo do RG
    if (btnDownloadPreview) {
        btnDownloadPreview.addEventListener('click', () => {
            if (!isCalendarAdded) {
                // Rola suavemente até a seção de campanha se ainda não tiver agendado
                const campanhaSection = document.getElementById('campanha');
                if (campanhaSection) {
                    campanhaSection.scrollIntoView({ behavior: 'smooth' });
                    if (btnAgenda) {
                        btnAgenda.classList.add('animate-bounce');
                        setTimeout(() => btnAgenda.classList.remove('animate-bounce'), 2500);
                    }
                }
            } else {
                triggerDirectPrint();
            }
        });
    }

    // Clique no botão de Baixar na área da campanha
    if (btnBaixar) {
        btnBaixar.addEventListener('click', () => {
            if (!btnBaixar.disabled) {
                triggerDirectPrint();
            }
        });
    }

    // Botão "Entrar" no topo
    const btnEntrar = document.getElementById('btn-entrar');
    if (btnEntrar) {
        btnEntrar.addEventListener('click', () => {
            openModal(
                'Área do Tutor - Em Breve!',
                `<p>A funcionalidade de <strong>login e conta de tutor</strong> estará disponível nas próximas versões.</p>
                 <p class="bg-secondary p-3 brutal-border shadow-brutal-sm font-bold mt-2">
                    Por enquanto, você pode gerar, personalizar e baixar a prévia do RG Pet Digital gratuitamente nesta página!
                 </p>`
            );
        });
    }

    // Modais dos links do rodapé
    const footerPrivacidade = document.getElementById('footer-privacidade');
    const footerTermos = document.getElementById('footer-termos');
    const footerContato = document.getElementById('footer-contato');

    if (footerPrivacidade) {
        footerPrivacidade.addEventListener('click', () => {
            openModal(
                'Política de Privacidade',
                `<p>Respeitamos a privacidade do seu amiguinho e a sua!</p>
                 <p>Todos os dados preenchidos no formulário (nome, fotos e telefone) são processados <strong>exclusivamente de forma local no seu próprio navegador</strong> para renderizar a prévia da carteirinha.</p>
                 <p>Nenhuma informação pessoal é enviada para servidores externos ou armazenada em banco de dados.</p>`
            );
        });
    }

    if (footerTermos) {
        footerTermos.addEventListener('click', () => {
            openModal(
                'Termos de Uso',
                `<p>O <strong>RG Pet Digital</strong> é uma iniciativa simbólica e educativa criada para incentivar a posse responsável e o acompanhamento do histórico de vacinação animal.</p>
                 <p>Este documento não possui valor oficial de órgão governamental ou cartório civil, servindo como uma carteirinha afetiva de identificação e saúde.</p>`
            );
        });
    }

    if (footerContato) {
        footerContato.addEventListener('click', () => {
            openModal(
                'Contato & Projeto ODS 17',
                `<p>Este projeto faz parte de um trabalho acadêmico universitário focado na conscientização em saúde animal na comunidade de <strong>Nova Mamoré - Rondônia</strong>, alinhado aos <strong>Objetivos de Desenvolvimento Sustentável da ONU (ODS 3 e ODS 15)</strong>.</p>
                 <p class="font-bold">Dúvidas ou sugestões?</p>
                 <p class="bg-background p-2 brutal-border">✉️ E-mail: caikeuninter@gmail.com</p>`
            );
        });
    }

});
