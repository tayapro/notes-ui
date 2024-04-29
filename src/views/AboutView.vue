<script setup>
import TheFooter from '../components/TheFooter.vue'
</script>

<template>
    <div class="main-container">
        <div class="header-container">
            <img class="logo-picture" src="../assets/TheNotesLogo.png" />
        </div>
        <div class="content-container">
            <div class="box">
                <p>
                    Hey there! My name is Taya and
                    <span class="welcome-the-notes">Welcome to TheNotes</span>.
                </p>
                <p>
                    "TheNotes" is my self-education web application. The aim of
                    this project was to create user-friendly software for
                    making, editing, searching, and deleting notes under your
                    account.
                </p>
                <p>
                    "TheNotes" application has features such as JWT tokens and
                    securely storing users' credentials and notes in MongoDB.
                    For the backend, I utilized Node.js and Express for the HTTP
                    API, and for the frontend, I used Vue.js and Vite.
                </p>
                <p>
                    I'm pleased with how the application turned out and proud of
                    my work.
                </p>
                <p>
                    Making people's lives easier and helping them understand IT
                    better is my valuable contribution. My experience in IT
                    support provides me a great opportunity to do that.
                    Currently, I'm dedicated to expanding my expertise in web
                    software development and cloud computing.
                </p>
                <div>
                    <p>
                        <img
                            class="right-girl-with-ideas"
                            src="../assets/GirlWithIdeas.png"
                        />
                        Outside of work and learning, I find joy in tending to
                        my garden and adding personal touches to my home,
                        whether it's painting walls or building shed for my
                        growing collection of "handywoman" tools.
                    </p>

                    <p>
                        I also treasure moments spent with friends and love cozy
                        evenings watching TV series with my family.
                    </p>
                    <p>It's wonderful to meet you!</p>
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<style scoped>
.box {
    padding: 2rem;
    background-color: rgb(255, 255, 255);
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.35);
}

.right-girl-with-ideas {
    float: right;
    width: 8rem;
    height: 8rem;
    margin-left: 1.5rem;
    opacity: 0.8;
}

p {
    text-align: justify;
    text-justify: inter-word;
}

.welcome-the-notes {
    font-weight: bold;
    font-style: italic;
}

.header-container {
    width: 100%;
    z-index: 10;
    align-items: left;
    display: flex;
    overflow: hidden;
    padding-top: 0.5rem;
}

.logo-picture {
    height: 6rem;
    margin-left: 0.5rem;
}

.content-container {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
}

.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
