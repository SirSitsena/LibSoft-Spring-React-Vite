INSERT INTO CATEGORY ( CATEGORY_NAME)
VALUES
    ('Fantasy'),
    ('Science Fiction'),
    ('Mystery'),
    ('Thriller'),
    ('Romance'),
    ('Horror'),
    ('Fiction'),
    ('Biography'),
    ('Dystopian'),
    ('History'),
    ('Drama'),
    ('Comedy'),
    ('Action'),
    ('Adventure'),
    ('Poetry'),
    ('Self-help'),
    ('Philosophy'),
    ('Religion'),
    ('Science');

insert into LIB_ITEMS (AUTHOR, PAGES, RUN_TIME_MINUTES, TITLE, TYPE,CATEGORY_ID)
values
    ('J.K. Rowling', 300, NULL, 'Harry Potter and the Philosophers Stone', 'book', 1),
    ('Stephen King', 500, NULL, 'The Stand', 'book', 6),
    ('Margaret Atwood', 350, NULL, 'The Handmaids Tale', 'book', 9),
    ('Ernest Hemingway', 200, NULL, 'The Old Man and the Sea', 'book', 7),
    ('Jane Austen', 400, NULL, 'Pride and Prejudice', 'book', 5),
    ('Agatha Christie', 250, NULL, 'Murder on the Orient Express', 'book', 3),
    ('J.R.R. Tolkien', 600, NULL, 'The Lord of the Rings', 'book', 1),
    ('Gabriel Garcia Marquez', 350, NULL, 'One Hundred Years of Solitude', 'book', 3),
    ('George Orwell', 200, NULL, 'Animal Farm', 'book', 2),
    ('Markus Zusak', 400, NULL, 'The Book Thief', 'book', 7),
    ('Cormac McCarthy', 287, NULL, 'The Road', 'book', 4),
    ('Kurt Vonnegut', 215, NULL, 'Slaughterhouse-Five', 'book', 7),
    ('John Steinbeck', 455, NULL, 'East of Eden', 'book', 7),
    ('Neil Gaiman', 336, NULL, 'American Gods', 'book', 1),
    ('Gillian Flynn', 395, NULL, 'Gone Girl', 'book', 4),
    ('Octavia Butler', 320, NULL, 'Kindred', 'book', 2),
    ('Jhumpa Lahiri', 291, NULL, 'Interpreter of Maladies', 'book', 7),
    ('David Mitchell', 544, NULL, 'Cloud Atlas', 'book', 1),
    ('Toni Morrison', 321, NULL, 'Beloved', 'book', 7),
    ('Donna Tartt', 584, NULL, 'The Goldfinch', 'book', 7),
    ('J.D. Salinger', 277, NULL, 'The Catcher in the Rye', 'book', 7),
    ('Anthony Doerr', 531, NULL, 'All the Light We Cannot See', 'book', 7),
    ('George R.R. Martin', 694, NULL, 'A Game of Thrones', 'book', 1),
    ('Haruki Murakami', 607, NULL, '1Q84', 'book', 7),
    ('Margaret Mitchell', 1037, NULL, 'Gone with the Wind', 'book', 5),
    ('J.K. Rowling', 766, NULL, 'Harry Potter and the Goblet of Fire', 'book', 1),
    ('Dan Brown', 489, NULL, 'The Da Vinci Code', 'book', 7),
    ('Jules Verne', 308, NULL, 'Journey to the Center of the Earth', 'book', 2),
    ('Robert Jordan', 681, NULL, 'The Eye of the World', 'book', 1),
    ('Suzanne Collins', 374, NULL, 'The Hunger Games', 'book', 1),
    ('Mary Shelley', 280, NULL, 'Frankenstein', 'book', 6),
    ('H.G. Wells', 118, NULL, 'The Time Machine', 'book', 2),
    ('Ray Bradbury', 179, NULL, 'Fahrenheit 451', 'book', 1),
    ('Philip K. Dick', 244, NULL, 'Do Androids Dream of Electric Sheep?', 'book', 2),
    ('Isaac Asimov', 256, NULL, 'Foundation', 'book', 2),
    ('Harper Lee', 300, NULL, 'To Kill a Mockingbird', 'book', 7),
    ('Christopher Nolan', NULL, 152, 'The Dark Knight', 'dvd', 2),
    ('Steven Spielberg', NULL, 195, 'Schindler''s List', 'dvd', 10),
    ('Quentin Tarantino', NULL, 154, 'Pulp Fiction', 'dvd', 4),
    ('Robert Zemeckis', NULL, 142, 'Forrest Gump', 'dvd', 7),
    ('Jonathan Demme', NULL, 118, 'The Silence of the Lambs', 'dvd', 3),
    ('Irvin Kershner', NULL, 124, 'Star Wars: Episode V - The Empire Strikes Back', 'dvd', 2),
    ('Lana Wachowski', NULL, 136, 'The Matrix', 'dvd', 2),
    ('Martin Scorsese', NULL, 145, 'Goodfellas', 'dvd', 4),
    ('Bryan Singer', NULL, 106, 'The Usual Suspects', 'dvd', 4),
    ('David Fincher', NULL, 127, 'Se7en', 'dvd', 4),
    ('David Fincher', NULL, 139, 'Fight Club', 'dvd', 4),
    ('Christopher Nolan', NULL, 148, 'Inception', 'dvd', 2),
    ('Christopher Nolan', NULL, 130, 'The Prestige', 'dvd', 4),
    ('Martin Scorsese', NULL, 151, 'The Departed', 'dvd', 4),
    ('Ridley Scott', NULL, 155, 'Gladiator', 'dvd', 10),
    ('Steven Spielberg', NULL, 127, 'Jurassic Park', 'dvd', 2),
    ('James Cameron', NULL, 194, 'Avatar', 'dvd', 2),
    ('Peter Jackson', NULL, 201, 'The Lord of the Rings: The Return of the King', 'dvd', 1),
    ('Frank Darabont', NULL, 142, 'The Shawshank Redemption', 'dvd', 7),
    ('Francis Ford Coppola', NULL, 202, 'The Godfather: Part II', 'dvd', 4),
    ('David Allen', 267, 285, 'Getting Things Done: The Art of Stress-Free Productivity', 'reference_book', 17),
    ('Dale Carnegie', 288, 600, 'How to Win Friends and Influence People', 'reference_book', 16),
    ('Steven Levitt', 336, 310, 'Freakonomics: A Rogue Economist Explores the Hidden Side of Everything', 'reference_book', 7),
    ('Daniel Kahneman', 499, 720, 'Thinking, Fast and Slow', 'reference_book', 18),
    ('Nassim Nicholas Taleb', 444, 1150, 'The Black Swan: The Impact of the Highly Improbable', 'reference_book', 7),
    ('Simon Sinek', 256, 210, 'Start with Why: How Great Leaders Inspire Everyone to Take Action', 'reference_book', 18),
    ('Ray Dalio', 592, 1500, 'Principles: Life and Work', 'reference_book', 17),
    ('Malcolm Gladwell', 320, 370, 'The Tipping Point: How Little Things Can Make a Big Difference', 'reference_book', 7),
    ('Eckhart Tolle', 236, 210, 'The Power of Now: A Guide to Spiritual Enlightenment', 'reference_book', 17),
    ('Atul Gawande', 304, 475, 'The Checklist Manifesto: How to Get Things Right', 'reference_book', 17),
    ('David Graeber', 368, NULL, 'Debt: The First 5,000 Years', 'reference_book', 19),
    ('Michael Lewis', 320, 420, 'The Big Short: Inside the Doomsday Machine', 'reference_book', 7),
    ('Robert Cialdini', 336, 700, 'Influence: The Psychology of Persuasion', 'reference_book', 16),
    ('Daniel Pink', 272, 180, 'Drive: The Surprising Truth About What Motivates Us', 'reference_book', 17),
    ('Yuval Noah Harari', 464, 660, 'Sapiens: A Brief History of Humankind', 'reference_book', 10),
    ('Stephen King', NULL, 1934, 'It', 'audio_book', 6),
    ('Margaret Atwood', NULL, 684, 'The Handmaid''s Tale', 'audio_book', 1),
    ('George R.R. Martin', NULL, 3347, 'A Game of Thrones', 'audio_book', 1),
    ('John Green', NULL, 336, 'The Fault in Our Stars', 'audio_book', 5),
    ('E.L. James', NULL, 1149, 'Fifty Shades of Grey', 'audio_book', 5),
    ('Agatha Christie', NULL, 450, 'Murder on the Orient Express', 'audio_book', 3),
    ('Dan Brown', NULL, 1168, 'The Da Vinci Code', 'audio_book', 2),
    ('Gillian Flynn', NULL, 585, 'Gone Girl', 'audio_book', 4),
    ('Jojo Moyes', NULL, 803, 'Me Before You', 'audio_book', 5);

insert into EMPLOYEE (FIRST_NAME,LAST_NAME,SALARY,IS_CEO,IS_MANAGER,MANAGER_ID)
values  ('John', 'Doe', 7.875, 0, 0, 7),
        ('Jane', 'Doe', 7.875, 0, 0, 7),
        ('Bob', 'Smith', 7.875, 0, 0, 7),
        ('Sara', 'Lee', 7.875, 0, 0, 7),
        ('Mike', 'Johnson', 9, 0, 0, 8),
        ('Emily', 'Davis', 9, 0, 0, 9),
        ('Tom', 'Wilson', 17.25, 0, 1, 10),
        ('Sarah', 'Jones', 17.25, 0, 1, 10),
        ('David', 'Brown', 17.25, 0, 1, 10),
        ('Karen', 'Miller', 27.25, 1, 0, 0);

insert into USERS (USERNAME,PASSWORD)
values ('user', '011c945f30ce2cbafc452f39840f025693339c42'),
       ('user2', '011c945f30ce2cbafc452f39840f025693339c42'); --password: 1111