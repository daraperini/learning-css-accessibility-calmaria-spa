let ultimoElementoFocado;

// Prende a navegação do teclado dentro do modal
const gerenciarFocoModal = (modalId) => {
  const modal = document.querySelector(`#${modalId}`);
  const elementosModal = modal.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const primeiroElemento = elementosModal[0];
  const ultimoElemento = elementosModal[elementosModal.length - 1];

  primeiroElemento.focus();

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Se a tecla Shift + Tab for pressionada, e o foco estiver no primeiro elemento, mover foco para o último elemento
        if (document.activeElement === primeiroElemento) {
          e.preventDefault();
          ultimoElemento.focus();
        }
      } else {
        // Se a tecla Tab for pressionada, e o foco estiver no último elemento, mover foco para o primeiro elemento
        if (
          document.activeElement === ultimoElemento ||
          !modal.contains(document.activeElement)
        ) {
          e.preventDefault();
          primeiroElemento.focus();
        }
      }
    }
  });
};

// selecionar todos os itens da lista do cabeçalho
const itensMenuCabecalho = document.querySelectorAll(".cabecalho__lista-item");

const alternarModal = (modalId, abrir) => {
  const modal = document.querySelector(`#${modalId}`);

  if (abrir) {
    ultimoElementoFocado = document.activeElement;

    modal.style.display = "block";
    gerenciarFocoModal(modalId);
  } else {
    modal.style.display = "none";

    if (ultimoElementoFocado) {
      ultimoElementoFocado.focus();
    }
  }

  // barra de rolagem some, impede scrow
  document.body.style.overflow = abrir ? "hidden" : "auto";
};

// Quando clicar esc fechar modal e submenu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    alternarModal("ver-modal-inscrito", false);
    alternarModal("ver-modal-contato", false);
    alternarModal("ver-modal-enviado", false);

    document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
      alternarSubmenu(item, false);
    });
  }
});

const alternarSubmenu = (item, mostrar) => {
  const submenu = item.querySelector(".submenu");

  if (submenu) {
    //alterando display
    submenu.style.display = mostrar ? "block" : "none";

    //alterando aria-expanded (true quando tá mostrando o submenu, false quando não tá)
    const menuItem = item.querySelector(".cabecalho__lista-item a");
    menuItem.setAttribute("aria-expanded", mostrar ? true : false);

    //alterando direção do ícone de seta
    const dropDownExpandedIcon = item.querySelector(
      ".cabecalho__lista-item span"
    );
    dropDownExpandedIcon.classList.toggle("active", mostrar);
  }
};

itensMenuCabecalho.forEach((item) => {
  item.addEventListener("mouseover", () => alternarSubmenu(item, true));

  item.addEventListener("mouseout", () => alternarSubmenu(item, false));

  //adicionar evento click (dispositivos móveis)
  item.addEventListener("click", () => {
    const submenu = item.querySelector(".submenu");

    const isDisplayed = submenu.style.display === "block";

    alternarSubmenu(item, !isDisplayed);
  });
});

// Acordeão

document.querySelectorAll(".botao-acordeao").forEach((button) => {
  button.addEventListener("click", () => alternarAcordeao(button));
});

const alternarAcordeao = (button) => {
  const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";

  document.querySelectorAll(".botao-acordeao").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");

    const content = btn.nextElementSibling;
    content.classList.remove("expandido");
    content.setAttribute("aria-hidden", "true");
  });

  if (!isAlreadyOpen) {
    button.setAttribute("aria-expanded", "true");

    // seleciona o irmão imediato do elemento button (conteúdo do acordeao)
    const content = button.nextElementSibling;
    content.classList.add("expandido");
    content.setAttribute("aria-hidden", "false");
  }
};
