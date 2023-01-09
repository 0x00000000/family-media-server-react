export type PlaylistData = {
    playlist: string;
    videos: Array<string>;
    options?: {
        random?: boolean;
    }
}
