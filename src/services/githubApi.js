const GITHUB_USERNAME = "sneoldum";
const GITHUB_API_BASE = "https://api.github.com";

// GitHub API service class
class GitHubAPI {
  constructor() {
    this.baseURL = GITHUB_API_BASE;
    this.username = GITHUB_USERNAME;
  }

  // Generic fetch method with error handling
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);

      if (!response.ok) {
        throw new Error(
          `GitHub API Error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("GitHub API fetch error:", error);
      throw error;
    }
  }

  // Fetch user profile data
  async getUserProfile() {
    return this.fetchData(`/users/${this.username}`);
  }

  // Fetch user repositories
  async getUserRepositories() {
    return this.fetchData(
      `/users/${this.username}/repos?sort=updated&per_page=100`
    );
  }

  // Fetch specific repository details
  async getRepository(repoName) {
    return this.fetchData(`/repos/${this.username}/${repoName}`);
  }

  // Fetch user's popular repositories (with most stars)
  async getPopularRepositories(limit = 6) {
    const repos = await this.getUserRepositories();
    return repos
      .filter((repo) => !repo.fork) // Filter out forked repositories
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit);
  }

  // Fetch user's recent repositories
  async getRecentRepositories(limit = 6) {
    const repos = await this.getUserRepositories();
    return repos
      .filter((repo) => !repo.fork) // Filter out forked repositories
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, limit);
  }

  // Get repository languages
  async getRepositoryLanguages(repoName) {
    return this.fetchData(`/repos/${this.username}/${repoName}/languages`);
  }

  // Transform repository data for UI
  transformRepositoryData(repo) {
    return {
      id: repo.id,
      title: repo.name
        .replace(/-/g, " ")
        .replace(/([A-Z])/g, " $1")
        .trim(),
      name: repo.name,
      description: repo.description || "No description available",
      tech: [], // Will be populated with languages
      type: this.getRepositoryType(repo.name),
      repo: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updated: repo.updated_at,
      created: repo.created_at,
      size: repo.size,
    };
  }

  // Determine repository type based on name and language
  getRepositoryType(repoName) {
    const name = repoName.toLowerCase();

    if (name.includes("portfolio") || name.includes("github.io")) {
      return "Portfolio Website";
    } else if (name.includes("web") || name.includes("site")) {
      return "Web Application";
    } else if (name.includes("automation") || name.includes("system")) {
      return "Automation System";
    } else if (name.includes("shopping") || name.includes("ecommerce")) {
      return "E-commerce";
    } else if (name.includes("stock") || name.includes("inventory")) {
      return "Management System";
    } else if (name.includes("school") || name.includes("mvc")) {
      return "Web Application";
    } else if (name.includes("api") || name.includes("service")) {
      return "API Service";
    } else if (name.includes("bot") || name.includes("tool")) {
      return "Tool/Utility";
    } else {
      return "Project";
    }
  }

  // Get comprehensive user data
  async getCompleteUserData() {
    try {
      const [profile, repositories] = await Promise.all([
        this.getUserProfile(),
        this.getRecentRepositories(),
      ]);

      // Transform repositories data
      const transformedRepos = repositories.map((repo) =>
        this.transformRepositoryData(repo)
      );

      // Get languages for each repository
      const reposWithLanguages = await Promise.all(
        transformedRepos.map(async (repo) => {
          try {
            const languages = await this.getRepositoryLanguages(repo.name);
            const techStack = Object.keys(languages).slice(0, 3); // Top 3 languages
            return {
              ...repo,
              tech:
                techStack.length > 0
                  ? techStack
                  : [repo.language].filter(Boolean),
            };
          } catch (error) {
            console.warn(`Could not fetch languages for ${repo.name}:`, error);
            return {
              ...repo,
              tech: [repo.language].filter(Boolean),
            };
          }
        })
      );

      return {
        profile: {
          name: profile.name || profile.login,
          username: profile.login,
          bio: profile.bio,
          location: profile.location,
          company: profile.company,
          blog: profile.blog,
          email: profile.email,
          avatar: profile.avatar_url,
          followers: profile.followers,
          following: profile.following,
          publicRepos: profile.public_repos,
          publicGists: profile.public_gists,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at,
          twitterUsername: profile.twitter_username,
          githubUrl: profile.html_url,
        },
        repositories: reposWithLanguages,
      };
    } catch (error) {
      console.error("Error fetching complete user data:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const githubAPI = new GitHubAPI();
export default githubAPI;
