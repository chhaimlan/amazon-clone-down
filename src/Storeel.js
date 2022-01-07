import React from "react";
import "./Storeel.css";
import Story from "./Story";

function Storeel() {
  return (
    <div className="storeel">
      <Story
        image="https://eu-images.contentstack.com/v3/assets/bltcc7a7ffd2fbf71f5/blta9e8223e7236fbf3/617dbc3526fb603bc7ab483d/06e5130105e56fc50af34377f5399fb4c118f277.jpg?auto=webp&fit=crop&format=jpg&quality=100"
        profilesrc="https://static.bangkokpost.com/media/content/20211021/c1_4120903.jpg"
        title="Ronaldo"
      />
      <Story
        image="https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg?lm=1"
        profilesrc="https://static.toiimg.com/thumb/msid-84410730,width-1200,height-900,resizemode-4/.jpg"
        title="Messi"
      />
      <Story
        image="https://img.a.transfermarkt.technology/portrait/big/18922-1544774342.jpg?lm=1"
        profilesrc="https://news.cgtn.com/news/2021-05-19/France-bring-Karim-Benzema-back-after-6-years-for-Euro-2020-10oE2XDosRG/img/4df24ed3079a45ecb9e499d1d9a70c9b/4df24ed3079a45ecb9e499d1d9a70c9b.jpeg"
        title="Benzema"
      />
      <Story
        image="https://idsb.tmgrup.com.tr/ly/uploads/images/2020/09/12/57778.jpg"
        profilesrc="https://i.insider.com/5e31764c62fa8112346b0223?width=1200&format=jpeg"
        title="Neymar"
      />
      <Story
        image="https://i2-prod.football.london/incoming/article21060381.ece/ALTERNATES/s1200c/0_Erling-Haaland.jpg"
        profilesrc="https://www.sportsadda.com/static-assets/waf-images/fa/50/d2/1-1/zpUeLpXtKv.jpg?v=1.1&w=1024"
        title="Haaland"
      />
    </div>
  );
}

export default Storeel;
