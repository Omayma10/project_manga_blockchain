// Mock data
const authors = [
    { id: 1, name: 'Author A', mangas: [1, 2] },
    { id: 2, name: 'Author B', mangas: [3] }
];

const mangas = [
    { id: 1, title: 'Manga 1', authorId: 1, chapters: [1, 2] },
    { id: 2, title: 'Manga 2', authorId: 1, chapters: [3] },
    { id: 3, title: 'Manga 3', authorId: 2, chapters: [4, 5] },
	{ id: 4, title: 'Manga 3', authorId: 1, chapters: [4, 5] }
];

const chapters = [
    { id: 1, title: 'Chapter 1', mangaId: 1 },
    { id: 2, title: 'Chapter 2', mangaId: 1 },
	{ id: 3, title: 'Chapter 3', mangaId: 1 },
    { id: 4, title: 'Chapter 1', mangaId: 2 },
    { id: 5, title: 'Chapter 1', mangaId: 3 },
    { id: 6, title: 'Chapter 2', mangaId: 3 }
];

let userLibrary = [];

window.onload = function() {
    loadAuthors();
};

function loadAuthors() {
    const authorDropdown = document.querySelector('#authorSelector + .dropdown-menu');
    authors.forEach(author => {
        const anchor = document.createElement('a');
        anchor.className = 'dropdown-item';
        anchor.href = '#';
        anchor.textContent = author.name;
        anchor.onclick = () => loadMangas(author.id);
        authorDropdown.appendChild(anchor);
    });
}

let selectedMangaId = null;

function loadMangas(authorId) {
    const mangaDisplay = document.getElementById('mangaDisplay');
    mangaDisplay.innerHTML = ''; // Clear previous content
    const authorMangas = mangas.filter(manga => manga.authorId === authorId);

    authorMangas.forEach(manga => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.onclick = () => loadChapters(manga.id);

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = 'manga.jpg'; // Placeholder image
        img.alt = manga.title;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = manga.title;

        cardBody.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        mangaDisplay.appendChild(col);
		
		card.onclick = () => {
            if (selectedMangaId !== null) {
                // Remove highlight from previously selected manga
                document.querySelector(`#manga-${selectedMangaId}`).classList.remove('border-primary');
            }
            selectedMangaId = manga.id;
            card.classList.add('border-primary'); // Highlight the selected manga
            loadChapters(manga.id);
		};
		card.id = `manga-${manga.id}`;
    });
}

function loadChapters(mangaId) {

    const chapterDisplay = document.getElementById('chapterDisplay');
    chapterDisplay.style.display = 'block'; // Show chapter display
    chapterDisplay.innerHTML = ''; // Clear previous content
    const mangaChapters = chapters.filter(chapter => chapter.mangaId === mangaId);
    // Display the title of the selected manga above the chapters
    const selectedManga = mangas.find(manga => manga.id === mangaId);
    const mangaTitle = document.createElement('h3');
    mangaTitle.textContent = `Chapters of ${selectedManga.title}`;
    chapterDisplay.appendChild(mangaTitle);

    mangaChapters.forEach(chapter => {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'd-flex align-items-center justify-content-between my-2';

        const chapterTitle = document.createElement('p');
        chapterTitle.className = 'mb-0 large-font';
        chapterTitle.textContent = chapter.title;

        const buyButton = document.createElement('button');
        buyButton.className = 'btn btn-primary large-font';
        buyButton.textContent = 'Buy';
        buyButton.onclick = () => purchaseChapter(chapter.id);

        chapterDiv.appendChild(chapterTitle);
        chapterDiv.appendChild(buyButton);
        chapterDisplay.appendChild(chapterDiv);
    });
}

function purchaseChapter(chapterId) {
    if (!userLibrary.includes(chapterId)) {
        userLibrary.push(chapterId);
        alert('Chapter purchased successfully!');
    } else {
        alert('Chapter already in library!');
    }
}

document.getElementById('libraryAccess').onclick = function() {
    alert('Library: ' + userLibrary.join(', '));
    // Here you can implement a function to display the purchased chapters
};


// Connect to Ganache (localhost:7545 by default)
const web3 = new Web3('http://localhost:7545'); // Update with Ganache's RPC server URL if needed

// Check if Web3.js is connected to Ganache
web3.eth.net.isListening()
  .then(() => {
    console.log('Connected to Ganache');
    initContract(); // Call initContract once connected
  })
  .catch(() => console.error('Not connected to Ganache'));

let contract; // Contract instance

// Replace these placeholders with your contract's actual ABI and address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mangaId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_chapterTitle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contentURI",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "addChapter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mangaId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_chapterId",
				"type": "uint256"
			}
		],
		"name": "buyChapter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chapterOwnership",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chapters",
		"outputs": [
			{
				"internalType": "string",
				"name": "chapterTitle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contentURI",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isPublished",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mangaId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_chapterId",
				"type": "uint256"
			}
		],
		"name": "checkOwnership",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			}
		],
		"name": "createManga",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mangaId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_chapterId",
				"type": "uint256"
			}
		],
		"name": "getChapter",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPurchasedChapters",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mangas",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "numChapters",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Your contract's ABI
const contractAddress = '0x223C1861dBfEc9953d348648De88136FC2492fDB'; // Your contract's address

// Function to initialize the contract instance
function initContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log('Contract initialized:', contract);
}

// Function to create a manga
async function createManga() {
    const mangaTitle = document.getElementById("mangaTitle").value;
    // const mangaAuthor = document.getElementById("mangaAuthor").value;

    // Check if both title and author are entered
    //if (mangaTitle.trim() === "" || mangaAuthor.trim() === "") {
    //    alert("Please enter both a manga title and author address.");
    //    return;
    //}

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    try {
        const result = await contract.methods.createManga(mangaTitle).send({ from: sender });
        console.log('Transaction result:', result);

        // Update UI or display a success message
        alert("Manga created successfully!");
    } catch (error) {
        console.error('Error:', error);

        // Check if it's a custom error event and extract the message
        if (error.reason) {
            // Display the custom error message
            alert("Custom Error: " + error.reason);
        } else {
            // Display a generic error message for other errors
            alert("An error occurred. Please check the console for details.");
        }
    }
}


// Function to add a chapter to a manga
async function addChapter() {
    // Ensure contract is initialized before proceeding
    if (!contract) {
        alert("Contract is not initialized. Please wait for it to connect to Ganache.");
        return;
    }

    const mangaId = document.getElementById("mangaId").value; // Input field for selecting manga
    const chapterTitle = document.getElementById("chapterTitle").value;
    const contentURI = document.getElementById("chapterContentURI").value;
    const price = document.getElementById("chapterPrice").value;

    // Check if all required fields are filled
    if (mangaId.trim() === "" || chapterTitle.trim() === "" || contentURI.trim() === "" || price.trim() === "") {
        alert("Please fill in all required fields.");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[1];

    try {
        const result = await contract.methods.addChapter(mangaId, chapterTitle, contentURI, price)
            .send({ from: sender, gas: 3000000, gasPrice: '20000000000' }); // Adjust gas and gasPrice values as needed
        console.log('Transaction result:', result);

        // Update UI or display a success message
        alert("Chapter added successfully!");
    } catch (error) {
        console.error('Error:', error);
        alert("Error adding chapter. Please check the console for details.");
    }
}

// Function to buy a chapter
async function buyChapter() {
    // Ensure contract is initialized before proceeding
    if (!contract) {
        alert("Contract is not initialized. Please wait for it to connect to Ganache.");
        return;
    }

    const mangaId = document.getElementById("buyMangaId").value; // Input field for selecting manga
    const chapterId = document.getElementById("buyChapterId").value;

    // Check if both manga ID and chapter ID are entered
    if (mangaId.trim() === "" || chapterId.trim() === "") {
        alert("Please enter both a manga ID and chapter ID.");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    try {
        const result = await contract.methods.buyChapter(mangaId, chapterId)
            .send({ from: sender, value: web3.utils.toWei("0.00000000000000001", "ether"), gas: 3000000, gasPrice: '20000000000' }); // Adjust gas, gasPrice, and value as needed
        console.log('Transaction result:', result);

        // Update UI or display a success message
        alert("Chapter purchased successfully!");
    } catch (error) {
        console.error('Error:', error);
        alert("Error purchasing chapter. Please check the console for details.");
    }
}

// Function to read a chapter
async function getChapterContent() {
    // Ensure contract is initialized before proceeding
    if (!contract) {
        alert("Contract is not initialized. Please wait for it to connect to Ganache.");
        return;
    }

    const mangaId = document.getElementById("readMangaId").value; // Input field for selecting manga
    const chapterId = document.getElementById("readChapterId").value;

    // Check if both manga ID and chapter ID are entered
    if (mangaId.trim() === "" || chapterId.trim() === "") {
        alert("Please enter both a manga ID and chapter ID.");
        return;
    }

    try {
        // Call the contract's getChapter function to retrieve the content URI
        const contentURI = await contract.methods.getChapter(mangaId, chapterId).call();
        
        // Display the contentURI or use it in your application as needed
        console.log('Content URI:', contentURI);

        // You can display the contentURI on your webpage or use it to fetch and display the chapter content.
        // Example: You can create an <iframe> or load the contentURI in an HTML element.

        // Update UI or display the chapter content
        alert("Chapter content fetched successfully!");
    } catch (error) {
        console.error('Error:', error);
        alert("Error fetching chapter content. Please check the console for details.");
    }
}

// Call your contract methods using the 'contract' instance and update your UI accordingly
