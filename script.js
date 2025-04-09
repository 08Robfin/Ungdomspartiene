// Like functionality
function like(issueId) {
    let likes = JSON.parse(localStorage.getItem('likedIssues')) || {};
    let likeButton = document.getElementById(`like-${issueId}`);
  
    if (likes[issueId]) {
      delete likes[issueId];
      likeButton.innerHTML = 'Like';
    } else {
      likes[issueId] = true;
      likeButton.innerHTML = 'Unlike';
    }
  
    localStorage.setItem('likedIssues', JSON.stringify(likes));
  }
  
  // Initialize likes
  function initLikes() {
    let likes = JSON.parse(localStorage.getItem('likedIssues')) || {};
    
    for (let issueId in likes) {
      let likeButton = document.getElementById(`like-${issueId}`);
      if (likeButton) {
        likeButton.innerHTML = 'Unlike';
      }
    }
  }
  
  // Show liked issues
  function showLikedIssues() {
    let likes = JSON.parse(localStorage.getItem('likedIssues')) || {};
    let likedIssuesDiv = document.getElementById('liked-issues');
    likedIssuesDiv.innerHTML = ''; // Clear
  
    let parties = {
      su: [],
      auf: [],
      ungehoyre: [],
      fpu: [],
      gu: [],
      krfu: []
    };
  
    for (let issueId in likes) {
      if (issueId.startsWith('su-')) parties.su.push(issueId);
      else if (issueId.startsWith('auf-')) parties.auf.push(issueId);
      else if (issueId.startsWith('uh-')) parties.ungehoyre.push(issueId);
      else if (issueId.startsWith('fpu-')) parties.fpu.push(issueId);
      else if (issueId.startsWith('gu-')) parties.gu.push(issueId);
      else if (issueId.startsWith('krfu-')) parties.krfu.push(issueId);
    }
  
    // Display liked issues for each party
    displayPartyIssues('Likt i SU', parties.su, likedIssuesDiv);
    displayPartyIssues('Likt i AUF', parties.auf, likedIssuesDiv);
    displayPartyIssues('Likt i Unge Høyre', parties.ungehoyre, likedIssuesDiv);
    displayPartyIssues('Likt i FPU', parties.fpu, likedIssuesDiv);
    displayPartyIssues('Likt i Grønn Ungdom', parties.gu, likedIssuesDiv);
    displayPartyIssues('Likt i KrFU', parties.krfu, likedIssuesDiv);
  
    document.getElementById('liked-issues-popup').style.display = 'block'; 
  }
  
  function displayPartyIssues(heading, issues, container) {
    if (issues.length > 0) {
      let headingElem = document.createElement('h3');
      headingElem.textContent = heading;
      container.appendChild(headingElem);
      issues.forEach(issue => {
        let listItem = document.createElement('p');
        listItem.textContent = issue.replace(/.*-/, ''); // Simplified
        container.appendChild(listItem);
      });
    }
  }
  
  function closePopup() {
    document.getElementById('liked-issues-popup').style.display = 'none';
  }
  
  // Function to get likes for a specific party
  function getLikesForParty(party) {
    let likes = JSON.parse(localStorage.getItem('likedIssues')) || {};
    let count = 0;
  
    for (let issueId in likes) {
      if (issueId.startsWith(party + '-')) count++;
    }
    return count;
  }
  
  let chart;
  
  function showStats() {
    let partyLikes = {
      SU: getLikesForParty("su"),
      AUF: getLikesForParty("auf"),
      UngeH: getLikesForParty("uh"),
      FPU: getLikesForParty("fpu"),
      GU: getLikesForParty("gu"),
      KrFU: getLikesForParty("krfu")
    };
  
    let labels = Object.keys(partyLikes);
    let data = Object.values(partyLikes);
  
    if (chart) chart.destroy();
  
    let ctx = document.getElementById('likes-chart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Antall likes',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });
  
    document.getElementById('stats-popup').style.display = 'block';
  }
  
  function closeStatsPopup() {
    document.getElementById('stats-popup').style.display = 'none';
  }
  
  window.onload = function() {
    initLikes();
  };
  