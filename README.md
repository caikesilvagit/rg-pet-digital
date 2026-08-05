# 🐾 RG Pet Digital - Identificação & Conscientização Animal

> **Atividade Extensionista III: Tecnologia Aplicada à Inclusão Digital – Análise**  
> **Curso:** Bacharelado em Engenharia de Software | **Instituição:** Uninter  
> **Local de Aplicação:** Nova Mamoré - Rondônia (RO)  

[![Deploy via GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen?style=flat-square&logo=github)](https://caikesilvagit.github.io/rg-pet-digital/)
[![ODS 3](https://img.shields.io/badge/ODS%203-Sa%C3%BAde%20e%20Bem--Estar-blue?style=flat-square)](https://sdgs.un.org/goals/goal3)
[![ODS 15](https://img.shields.io/badge/ODS%2015-Vida%20Terrestre-green?style=flat-square)](https://sdgs.un.org/goals/goal15)
[![ODS 17](https://img.shields.io/badge/ODS%2017-Parcerias%20e%20Meios-orange?style=flat-square)](https://sdgs.un.org/goals/goal17)

---

## 📌 Sobre o Projeto

O **RG Pet Digital** é uma aplicação web reativa e acessível desenvolvida para promover a posse responsável e aumentar a adesão às campanhas de vacinação antirrábica animal no município de **Nova Mamoré - RO**.

A plataforma funciona como um **gatilho de engajamento social**: os tutores preenchem os dados do seu animal e geram uma carteirinha simbólica em tempo real (com QR Code dinâmico e RGA único). O download do documento está programaticamente condicionado à inclusão da data da próxima campanha de vacinação no **Google Agenda** do tutor.

---

## ✨ Funcionalidades Principais

- 🐶 **Geração do RG Pet em Tempo Real:** Atualização instantânea da carteirinha conforme o tutor digita os dados do animal.
- 📱 **QR Code Dinâmico:** Compilação dos dados estruturados do pet e do tutor em um QR Code escaneável.
- 🔒 **Algoritmo de RGA Único:** Geração de um número de Registro Geral Animal exclusivo baseado em hash numérico.
- 📅 **Integração com Google Agenda:** Automação de lembrete preventivo para a vacinação antirrábica municipal.
- 🛡️ **Privacidade & Segurança (LGPD):** Leitura de fotos em Base64 através da API nativa `FileReader`, sem upload ou envio de imagens para servidores externos.
- 🖨️ **Layout de Impressão Otimizado:** Formatação pronta para recorte e plastificação (tamanho padrão RG 10,5cm x 7,5cm).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Marcação estruturada para os formulários, containers e carteirinha.
- **CSS3 Customizado:** Estilização responsiva no padrão *Neo-Brutalist* e suporte a regras de impressão (`@media print`).
- **JavaScript (ES6+):** Manipulação de DOM em tempo real, algoritmo de hash para o RGA, manipulação de arquivos locais e integração com o Google Agenda.
- **GitHub Pages:** Hospedagem em nuvem e deploy contínuo.

---

## 📏 Métricas do Código-Fonte (SLOC)

O projeto foi desenvolvido em uma estrutura web nativa e leve, totalizando aproximadamente 1.167 linhas físicas de código (SLOC). O código está distribuído de forma organizada entre a marcação (`index.html` com 507 linhas), a lógica de funcionamento (`js/app.js` com 452 linhas) e a estilização customizada (`css/styles.css` com 208 linhas). Por utilizar apenas tecnologias nativas do navegador, a aplicação não exige compiladores ou dependências de backend, garantindo rápida execução e fácil manutenção.

---

## 👨‍💻 Autor & Contexto Acadêmico

* **Autor:** Caike Wagemocher Da Silva
* **Curso:** Bacharelado em Engenharia de Software – UNINTER
* **Disciplina:** Atividade Extensionista III: Tecnologia Aplicada à Inclusão Digital – Análise
