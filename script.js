
class CustomCard extends HTMLElement {
    constructor() {
      super();
      // Initialize the state
      this.state = {
        currentPage: 1,
        cardsPerPage: 3,
        cards: [],
      };
    }
  
    connectedCallback() {
      // Get the cards from the data-cards attribute
      this.state.cards = JSON.parse(this.getAttribute('data-cards'));
      // Render the initial cards
      this.renderCards();
      // Render the pagination
      this.renderPagination();
    }
  
    renderCards() {
      // Calculate the start and end indexes of the current page
      const startIndex = (this.state.currentPage - 1) * this.state.cardsPerPage;
      const endIndex = startIndex + this.state.cardsPerPage;
      // Get the current page of cards
      const currentCards = this.state.cards.slice(startIndex, endIndex);
      // Clear the existing cards
      this.innerHTML = '';
      // Render the current page of cards
      currentCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('custom-card__card');
        cardElement.innerHTML = `
          <h2 class="custom-card__card-title">${card.title}</h2>
          <p class="custom-card__card-content">${card.content}</p>
          <div class="custom-card__card-photo" style="background-image: url(${card.photo})"></div>
        `;
        this.appendChild(cardElement);
      });
    }
  
    renderPagination() {
      // Calculate the number of pages
      const totalPages = Math.ceil(this.state.cards.length / this.state.cardsPerPage);
      // Clear the existing pagination
      const paginationElement = document.createElement('div');
      paginationElement.classList.add('custom-card__pagination');
      this.appendChild(paginationElement);
      // Render the pagination buttons
      for (let i = 1; i <= totalPages; i++) {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('custom-card__pagination-button');
        buttonElement.textContent = i;
        if (i === this.state.currentPage) {
          buttonElement.classList.add('active');
        }
        buttonElement.addEventListener('click', () => {
          this.state.currentPage = i;
          // Re-render the cards and pagination
          this.renderCards();
          this.renderPagination();
        });
        paginationElement.appendChild(buttonElement);
      }
    }
  }
  
  // Define the custom element
  customElements.define('custom-card', CustomCard);
  