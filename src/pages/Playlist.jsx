import React from "react";
import { PlaylistCard, Grid, PlaylistTab } from "../ui";

function Playlist() {
  return (
    <div className=" p-3  w-full ">
      <h1 className="text-3xl font-bold text-white">Playlists</h1>
      <Grid>
        <PlaylistTab view="grid" />
      </Grid>
    </div>
  );
}

export default Playlist;
