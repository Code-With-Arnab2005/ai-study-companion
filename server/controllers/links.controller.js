import { getUserFromToken } from "../lib/getUserFromToken.js";
import { supabase } from "../lib/supabase/supabaseClient.js";

const insertLink = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { url, link_name, description = "" } = req.body;

        if (!url || url.length === 0) {
            return res.status(400).json({ success: false, message: "url is required" });
        }
        if (!link_name || link_name.length === 0) {
            return res.status(400).json({ success: false, message: "link_name is required" });
        }

        const cleanedUrl = url.trim();
        const cleandLinkName = link_name.trim();

        const { error } = await supabase
            .from("links")
            .insert([
                {
                    user_id: user.id,
                    url: cleanedUrl,
                    link_name: cleandLinkName,
                    description,
                }
            ])

        if (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Link Added successfully" });
    } catch (error) {
        console.log(error.message ?? "Something went wrong");
        return res.status(500).json({ success: false, message: error.message ?? "Something went wrong" });
    }
}

const updateLink = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { id: link_id } = req.query;
        if (!link_id) {
            return res.status(400).json({ success: false, message: "Link id not found" });
        }

        const { url, link_name, description } = req.body;
        if (!url || url.length === 0) {
            return res.status(400).json({ success: false, message: "url is required" });
        }
        if (!link_name || link_name.length === 0) {
            return res.status(400).json({ success: false, message: "link_name is required" });
        }

        const cleanedUrl = url.trim();
        const cleandLinkName = link_name.trim();

        const { data, error } = await supabase
            .from("links")
            .update({
                url: cleanedUrl,
                link_name: cleandLinkName,
                description
            })
            .eq("id", link_id)
            .eq("user_id", user.id)

        if (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Link Updated successfully", data });
    } catch (error) {
        console.log(error.message ?? "Something went wrong");
        return res.status(500).json({ success: false, message: error.message ?? "Something went wrong" });
    }
}

const getAllPaginatedLinks = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        let { page = 1, limit = 5 } = req.query;

        page = Math.max(parseInt(page) || 1, 1);
        limit = Math.max(parseInt(limit) || 5, 5);

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from("links")
            .select("*", { count: "exact" })
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });


        // filter by page and limit
        query = query.range(from, to);

        const { data, count, error } = await query;

        if (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Links fetched successfully",
                data: {
                    links: data,
                    currPage: page,
                    totalPages: Math.ceil(count / limit),
                    totalLinks: count
                }
            });
    } catch (error) {
        console.log(error.message ?? "Something went wrong");
        return res.status(500).json({ success: false, message: error.message ?? "Something went wrong" });
    }
}

const getLinkById = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { id: link_id } = req.query;
        if (!link_id) {
            return res.status(400).json({ success: false, message: "Link id not found" });
        }

        const { data, error } = await supabase
            .from("links")
            .select("*")
            .eq("user_id", user.id)
            .eq("id", link_id)
            .single()

        if (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Links fetched successfully", data });
    } catch (error) {
        console.log(error.message ?? "Something went wrong");
        return res.status(500).json({ success: false, message: error.message ?? "Something went wrong" });
    }
}

const deleteLinkById = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { id: link_id } = req.query;
        if (!link_id) {
            return res.status(400).json({ success: false, message: "Link id not found" });
        }

        const { error } = await supabase
            .from("links")
            .delete()
            .eq("id", link_id)
            .eq("user_id", user.id)

        if (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Link Deleted successfully" });
    } catch (error) {
        console.log(error.message ?? "Something went wrong");
        return res.status(500).json({ success: false, message: error.message ?? "Something went wrong" });
    }
}

const changeLikeStatusByLinkId = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { id: link_id } = req.query;
        if (typeof link_id !== "boolean") {
            return res.status(400).json({ success: false, message: "Link id not found" });
        }

        const { is_liked } = req.body;
        if (!is_liked) {
            return res.status(400).json({ success: false, message: "like status is required" });
        }

        const { error } = await supabase
            .from("links")
            .udpate({
                is_liked
            })
            .eq("id", link_id)
            .eq("user_id", user.id);

        if (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Link Like Status changed successfully", data });
    } catch (error) {
        console.log(error.message ?? "Something went wrong");
        return res.status(500).json({ success: false, message: error.message ?? "Something went wrong" });
    }
}

export {
    insertLink,
    updateLink,
    getAllPaginatedLinks,
    getLinkById,
    deleteLinkById,
    changeLikeStatusByLinkId
}