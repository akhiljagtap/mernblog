import { Post } from "../models/postModal.js"
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {
    // console.log(req.user)  // userId,isAdmin,iatid
    // console.log(req.params); // {}
    // console.log(req.body); // title , content
    // console.log(req.user.id); //userId
    // console.log(req.params.postId); //undefined
    // console.log(req.params.userId);//undefined
    // console.log(req.params.postId);

    if (!req.user.isAdmin) {
        return next(errorHandler(402, "You are not allow to create a post."))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(402, "Please provide all require feilds"))
    }

    const slug = req.body.title
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id

    })
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch (error) {
        next(error)

    }


}

export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 8
        const SortDirection = req.query.order === "asc" ? 1 : -1

        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } }

                ]
            })

        }).sort({ updatedAt: SortDirection }).skip(startIndex).limit(limit)

        const totalPosts = await Post.countDocuments()


        const now = new Date()

        // const oneMonthAgo = new Date(
        //     now.getFullYear(),
        //     now.getMonth() - 1,
        //     now.getTime()
        // )
        // const lastMonthPost = await Post.countDocuments({
        //     createdAt: { $gte: oneMonthAgo }

        // })

        res.status(200).json({
            posts,
            // lastMonthPost,
            totalPosts

        })


    } catch (error) {
        next(error)
    }

}

export const deleteposts = async (req, res, next) => {

    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(402, "You are not allow to delete this post."))
    }
    try {
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json("The post has been deleted.")

    } catch (error) {
        next(error)

    }


}

export const updateposts = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        next(errorHandler(401, "You are not allow to update this post."))

    }
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.postId, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                image: req.body.image

            }
        }, { new: true })
        res.status(200).json(updatePost)


    } catch (error) {
        next(error)

    }


}













