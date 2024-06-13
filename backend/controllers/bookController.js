//IMPORTATION MODEL
const Book = require("../models/Book"); 

//IMPORTATION DE FS
const fs = require("fs");

/* MÉTHODES */

    //RÉCUPÉRATION DE TOUS LES LIVRES
    exports.getAllBooks =  (req, res, next) => {
        
        Book.find()
        .then(
            (books) => 
            {
                if(!books || books.length === 0)
                {
                    return res.status(404).json(new Error("Aucun livre trouvé"));
                }
                else
                {
                    res.status(200).json(books);
                }
            }
        )
        .catch( error => res.status(400).json( {error} ))
    }

    //RÉCUPÉRATION D'UN LIVRE
    exports.getBook = (req, res, next) => {

        Book.findOne( {_id : req.params.id} )
        .then( book => res.status(200).json( book ) )
        .catch( error => res.status(404).json( {error} ))

    }

    //RÉCUPÉRATION DES TROIS LIVRES LES MIEUX NOTÉS
    exports.getBestThree = (req, res, next) => {
        
        Book.find()
        .then(
            books => {

                if(!books || books.length === 0)
                {
                    return res.status(404).json(new Error("Aucun livre trouvé"));
                }
                else
                {
                    const sortedBooks = books.sort( (a,b) => b.averageRating - a.averageRating )
        
                    const topThreeBooks = sortedBooks.slice(0,3);

                    res.status(200).json(topThreeBooks);
                }
            }
        )
        .catch( error => res.status(500).json( {error} ))  
    }
       
    //ENREGISTREMENT D'UN LIVRE
    exports.createBook = (req, res, next) => {  
            
        //TRANSFORMATION DE LA CHAINE DE CARACTÈRES EN JSON
        const bookObject = JSON.parse(req.body.book);

        ////SUPPRESSION DU CHAMP ID AUTOMATIQUE DE MONGO DB DU CORPS DE LA REQUÊTE
        delete bookObject._id;

        //SUPPRESSION DU CHAMP ID UTILISATEUR PAR MESURE DE SÉCURITÉ
        delete bookObject.userId;

        //CRÉATION D'UNE INSTANCE DE BOOK
        const book = new Book( 
        { 
            ...bookObject, 
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        })

        book.save()
        .then( () => res.status(201).json( {message: "Livre enregistré"} ))
        .catch( error => res.status(400).json( {error} ))
    }

    //FONCTION mettreAJourLivre
    function mettreAJourLivre(req, res, next, bookObject) 
    {
        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Livre modifié" }))
        .catch((error) => res.status(401).json({ error }));
    }

    //MISE À JOUR D'UN LIVRE
    exports.updateBook = (req, res, next) => {
        
        const bookObject = req.file ? {
            ...JSON.parse(req.body.book), 
            urlImage: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
        } : {...req.body}

        //SUPPRESSION DU CHAMP ID UTILISATEUR PAR MESURE DE SÉCURITÉ
        delete bookObject.userId;

        Book.findOne({_id: req.params.id})
        .then(
            (book) => {

                console.log(req);

                if(book.userId !== req.auth.userId)
                {
                    res.status(401).json({ message: "Non autorisé" })
                }
                else
                {
                        //SI NOUVELLE IMAGE
                        if(req.file) 
                        {
                            console.log("Nouvelle image téléchargée");

                            //SUPPRESSION DE L'ANCIENNE
                            const filename = book.imageUrl.split('/images/')[1]
                            fs.unlink(`images/${filename}`, () => {
                        
                                bookObject.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
                                mettreAJourLivre(req, res, next, bookObject);
                        
                            })
                        }
                        //AUCUNE IMAGE TÉLÉCHARGÉE 
                        else 
                        {
                            console.log("book :" + book);
                            console.log("bookObject :" + bookObject);
                            console.log("Aucune nouvelle image téléchargée");
                            mettreAJourLivre(req, res, next, bookObject);   
                    } 
        
                }
            }
        )
        .catch( (error) => {
        
            console.error("Erreur lors de la mise à jour du livre :", error);
            res.status(400).json({error});
        })
    }

    //SUPPRESSION D'UN LIVRE
    exports.deleteBook = (req, res, next) => {
        
        Book.findOne({_id : req.params.id})
        .then( (book) =>  {
            if(book.userId !== req.auth.userId)
            {
                res.status(401).json({ message: 'Non-autorisé'})
            }
            else
            {
                //RÉCUPÉRATION DE L'IMAGE POUR LA SUPPRESSION
                const filename = book.imageUrl.split('/images/')[1];

                fs.unlink(`images/${filename}`,() => {
                    Book.deleteOne( {_id : req.params.id} )
                    .then( () => res.status(200).json( {message: "Livre supprimé"} ) )
                    .catch( error => res.status(400).json( {error} ))
                })

                
            }
        })
        .catch( error => res.status(400).json( {error} ))
    }

    //NOTATION D'UN LIVRE
    exports.rateBook = (req, res, next) => {
    
        const updateRating = {userId: req.auth.userId, grade: req.body.rating}

        Book.findOne( {_id : req.params.id} )
        .then(  
            
            (book) => {

                //LE LIVRE EST INTROUVABLE
                if(!book)
                {                    
                    return res.status(404).json( new Error("Impossible de trouver le livre") )
                }
                //LE LIVRE EXISTE
                else
                {
                    //LE LIVRE A DÉJÀ ÉTÉ NOTÉ
                    if(book.ratings.find( rating => rating.userId === req.auth.userId ))
                    {
                        return res.status(400).json( new Error("Vous avez déjà noté le livre") )
                    }
                    //LE LIVRE N'A JAMAIS ÉTÉ NOTÉ
                    else
                    {
                        //VÉRIFICATION QUE LA NOTE EST COMPRISE ENTRE 0 ET 5 (INCLUS)
                        if(updateRating.grade < 0 || updateRating.grade > 5)
                        {
                            return res.status(400).json( new Error("La note doit être comprise entre 0 et 5") )
                        }  
                        else if(typeof updateRating.grade !== 'number')
                        {
                            return res.status(400).json( new Error("La note doit être un chiffre") )
                        }
                        //LA NOTE EST VALABLE
                        else
                        {
                            //ON AJOUTE LA NOTATION DU LIVRE
                            book.ratings.push(updateRating);

                            //ON CALCULE LA SOMMES DES NOTES DU LIVRE
                            const sumRatings = book.ratings.reduce((acc, rating) => acc + rating.grade, 0);

                            //ON CALCULE LA NOUVELLE MOYENNE DU LIVRE
                            book.averageRating = sumRatings / book.ratings.length;
        
                            book.save()
                            .then( bookUpdated => res.status(200).json( bookUpdated ))
                            .catch( error => res.status(500).json( {error} ))
                        }
                    }
                }
            }
        )
        .catch( error => res.status(500).json( {error} ))
    }

/* FIN MÉTHODES */